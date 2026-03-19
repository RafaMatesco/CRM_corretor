import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useProperties } from '@/hooks/useProperties'
import { useLeads } from '@/hooks/useLeads'
import { CatalogPage } from '@/pages/public/CatalogPage'
import { PropertyDetailPage } from '@/pages/public/PropertyDetailPage'
import { LoginPage } from '@/pages/admin/LoginPage'
import { DashboardLayout } from '@/pages/admin/DashboardLayout'
import { Spinner } from '@/components/ui/Spinner'
import { Analytics } from "@vercel/analytics/react"

/**
 * View states:
 *  'public'   – public property catalog
 *  'detail'   – single property detail
 *  'login'    – admin login screen
 *  'admin'    – protected dashboard
 */
export default function App() {
  const { user, loading: authLoading, signIn, signOut } = useAuth()

  const {
    properties,
    loading: propsLoading,
    create: createProperty,
    update: updateProperty,
    remove: removeProperty,
    togglePublish,
    recordView,
  } = useProperties()

  const {
    leads,
    create: createLead,
    updateStatus: updateLeadStatus,
    remove: removeLead,
  } = useLeads()

  const [view, setView] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('property') ? 'detail' : 'public'
  })
  const [selectedProperty, setSelected] = useState(null)

  // ── Handle Initial URL ──────────────────────────────────────────────────
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const propertyId = params.get('property')
    if (propertyId && properties.length > 0 && !selectedProperty) {
      const prop = properties.find(p => String(p.id) === propertyId)
      if (prop) {
        setSelected(prop)
        setView('detail')
      } else {
        // If property not found, clear URL and return to public
        setView('public')
        const url = new URL(window.location)
        url.searchParams.delete('property')
        window.history.replaceState({}, '', url)
      }
    }
  }, [properties, selectedProperty])

  // Handle browser back/forward buttons
  React.useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const propertyId = params.get('property')
      if (propertyId && properties.length > 0) {
        const prop = properties.find(p => String(p.id) === propertyId)
        if (prop) {
          setSelected(prop)
          setView('detail')
        }
      } else {
        setView('public')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [properties])

  // ── Auth ──────────────────────────────────────────────────────────────
  const handleLogin = async (email, password) => {
    const result = await signIn(email, password)
    if (!result.error) setView('admin')
    return result
  }

  const handleLogout = async () => {
    await signOut()
    setView('public')
  }

  // ── Navigation helpers ────────────────────────────────────────────────
  const openDetail = (property) => {
    setSelected(property)
    setView('detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const url = new URL(window.location)
    url.searchParams.set('property', property.id)
    window.history.pushState({}, '', url)
  }

  const goBackToPublic = () => {
    setView('public')
    const url = new URL(window.location)
    url.searchParams.delete('property')
    window.history.pushState({}, '', url)
  }

  const handleNewLead = async (payload) => {
    await createLead(payload)
  }

  // ── Loading splash ────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream text-gold">
        <Spinner size={40} />
      </div>
    )
  }

  // ── Admin: redirect to login if not authenticated ─────────────────────
  if (view === 'admin' && !user) {
    return <LoginPage onLogin={handleLogin} />
  }

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <>
      <Analytics />
      {view === 'public' && (
        <CatalogPage
          properties={properties.filter((p) => p.is_published)}
          loading={propsLoading}
          onSelectProperty={openDetail}
          onAdminClick={() => user ? setView('admin') : setView('login')}
        />
      )}

      {view === 'detail' && selectedProperty && (
        <PropertyDetailPage
          property={selectedProperty}
          onBack={goBackToPublic}
          onAdminClick={() => user ? setView('admin') : setView('login')}
          onLead={handleNewLead}
          onRecordView={recordView}
        />
      )}

      {view === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}

      {view === 'admin' && user && (
        <DashboardLayout
          user={user}
          onLogout={handleLogout}
          onViewPublic={() => setView('public')}
          properties={properties}
          leads={leads}
          onCreate={createProperty}
          onUpdate={updateProperty}
          onDelete={removeProperty}
          onTogglePublish={togglePublish}
          onUpdateLeadStatus={updateLeadStatus}
          onDeleteLead={removeLead}
        />
      )}
    </>
  )
}
