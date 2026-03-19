import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useProperties } from '@/hooks/useProperties'
import { useLeads } from '@/hooks/useLeads'
import { CatalogPage } from '@/pages/public/CatalogPage'
import { PropertyDetailPage } from '@/pages/public/PropertyDetailPage'
import { LoginPage } from '@/pages/admin/LoginPage'
import { DashboardLayout } from '@/pages/admin/DashboardLayout'
import { Spinner } from '@/components/ui/Spinner'
import { Analytics } from "@vercel/analytics/next"

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

  const [view, setView] = useState('public')   // 'public' | 'detail' | 'login' | 'admin'
  const [selectedProperty, setSelected] = useState(null)

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
          onBack={() => setView('public')}
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
