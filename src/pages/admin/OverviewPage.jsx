import { Building2, Eye, Users, CheckCircle } from 'lucide-react'
import { StatCard }   from '@/components/admin/StatCard'
import { Badge }      from '@/components/ui/Badge'
import { LEAD_STATUSES } from '@/lib/constants'
import { formatPrice, formatDate, initials } from '@/lib/utils'

export function OverviewPage({ properties, leads }) {
  const published  = properties.filter((p) => p.is_published).length
  const totalViews = properties.reduce((a, p) => a + (p.views ?? 0), 0)
  const newLeads   = leads.filter((l) => l.status === 'novo').length
  const closed     = leads.filter((l) => l.status === 'fechado').length

  const topProps    = [...properties].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 5)
  const recentLeads = [...leads].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6)
  const maxViews    = Math.max(...topProps.map((p) => p.views ?? 0), 1)

  return (
    <div className="fade-in">
      <div className="mb-7">
        <h1 className="font-display text-2xl font-semibold text-navy">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Bem-vindo ao painel de controle.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Imóveis Publicados"      value={published}                        sub={`de ${properties.length} cadastrados`} icon={Building2}   iconColor="#0F1B2D" />
        <StatCard label="Visualizações Totais"    value={totalViews.toLocaleString('pt-BR')} sub="nos últimos 30 dias"                  icon={Eye}         iconColor="#C9A84C" />
        <StatCard label="Novos Leads"             value={newLeads}                         sub="aguardando contato"                    icon={Users}       iconColor="#2D7D5E" />
        <StatCard label="Negócios Fechados"       value={closed}                           sub="este mês"                              icon={CheckCircle} iconColor="#6366F1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top properties */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-sm">Imóveis Mais Vistos</h3>
            <Badge color="gold">Analytics</Badge>
          </div>
          <div>
            {topProps.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 px-6 py-3 border-b border-gray-50 last:border-0">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === 0 ? 'bg-gold text-white' : 'bg-cream-dark text-gray-400'}`}>{i + 1}</span>
                <img src={p.images?.[0]} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{p.title}</p>
                  <div className="mt-1.5 bg-cream-dark rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${((p.views ?? 0) / maxViews) * 100}%` }} />
                  </div>
                </div>
                <span className="text-sm font-bold text-navy flex-shrink-0">{p.views ?? 0}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent leads */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-sm">Leads Recentes</h3>
            {newLeads > 0 && <Badge color="blue">{newLeads} novos</Badge>}
          </div>
          <div>
            {recentLeads.map((lead, i) => {
              const st = LEAD_STATUSES[lead.status]
              return (
                <div key={lead.id} className="flex items-center gap-3 px-6 py-3 border-b border-gray-50 last:border-0">
                  <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {initials(lead.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">{lead.name}</p>
                    <p className="text-xs text-gray-400 truncate">{lead.property_title}</p>
                  </div>
                  <Badge color={st?.color ?? 'gray'}>{st?.label}</Badge>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
