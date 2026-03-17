import { useState } from 'react'
import { AdminNav } from '@/components/admin/AdminNav'
import { Sidebar } from '@/components/admin/Sidebar'
import { Toast } from '@/components/ui/Toast'
import { OverviewPage } from './OverviewPage'
import { PropertiesPage } from './PropertiesPage'
import { LeadsPage } from './LeadsPage'
import { AnalyticsPage } from './AnalyticsPage'

export function DashboardLayout({
  user,
  onLogout,
  onViewPublic,
  properties,
  leads,
  onCreate,
  onUpdate,
  onDelete,
  onTogglePublish,
  onUpdateLeadStatus,
  onDeleteLead,
}) {
  const [section, setSection] = useState('overview')
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3200)
  }

  const newLeadsCount = leads.filter((l) => l.status === 'novo').length

  const content = {
    overview: <OverviewPage properties={properties} leads={leads} />,
    properties: <PropertiesPage
      properties={properties}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
      onTogglePublish={onTogglePublish}
      showToast={showToast}
    />,
    leads: <LeadsPage
      leads={leads}
      onUpdateStatus={onUpdateLeadStatus}
      onDelete={onDeleteLead}
      showToast={showToast}
    />,
    analytics: <AnalyticsPage properties={properties} leads={leads} />,
  }
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <AdminNav user={user} onLogout={onLogout} onViewPublic={onViewPublic} />

      <div className="flex flex-1">
        <Sidebar
          active={section}
          onNav={setSection}
          user={user}
          newLeadsCount={newLeadsCount}
        />
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          {content[section]}
        </main>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
