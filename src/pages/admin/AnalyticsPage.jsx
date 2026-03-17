import { StatCard } from '@/components/admin/StatCard'
import { Eye, Building2, TrendingUp, Users } from 'lucide-react'

const TREND = [
  { month: 'Out', views: 892,  leads: 18 },
  { month: 'Nov', views: 1042, leads: 24 },
  { month: 'Dez', views: 976,  leads: 21 },
  { month: 'Jan', views: 1234, leads: 31 },
  { month: 'Fev', views: 1456, leads: 38 },
  { month: 'Mar', views: 1238, leads: 34 },
]

export function AnalyticsPage({ properties }) {
  const sorted     = [...properties].sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
  const maxViews   = Math.max(...sorted.map((p) => p.views ?? 0), 1)
  const totalViews = properties.reduce((a, p) => a + (p.views ?? 0), 0)
  const maxTrend   = Math.max(...TREND.map((t) => t.views))
  const maxLeads   = Math.max(...TREND.map((t) => t.leads))

  return (
    <div className="fade-in">
      <div className="mb-7">
        <h1 className="font-display text-2xl font-semibold text-navy">Analytics</h1>
        <p className="text-sm text-gray-400 mt-1">Métricas de desempenho do portal.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Visualizações Totais"  value={totalViews.toLocaleString('pt-BR')} icon={Eye}        iconColor="#C9A84C" />
        <StatCard label="Imóveis Publicados"    value={properties.filter(p => p.is_published).length}        icon={Building2}   iconColor="#0F1B2D" />
        <StatCard label="Taxa de Conversão"     value="2,7%"   sub="views → leads"                           icon={TrendingUp}  iconColor="#2D7D5E" />
        <StatCard label="Leads este Mês"        value={34}                                                    icon={Users}       iconColor="#6366F1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views per property */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-sm">Visualizações por Imóvel</h3>
          </div>
          <div className="px-6 py-4 flex flex-col gap-4">
            {sorted.map((p, i) => (
              <div key={p.id}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-navy truncate max-w-[75%]">{p.title}</span>
                  <span className="font-bold">{p.views ?? 0}</span>
                </div>
                <div className="bg-cream-dark rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${((p.views ?? 0) / maxViews) * 100}%`,
                      background: i === 0 ? '#C9A84C' : '#0F1B2D',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend: views vs leads */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-sm">Tendência: Visualizações × Leads</h3>
          </div>
          <div className="px-6 py-4 flex flex-col gap-4">
            {TREND.map((row) => (
              <div key={row.month}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-navy w-8">{row.month}</span>
                  <span className="text-gray-400">{row.views.toLocaleString('pt-BR')} views · {row.leads} leads</span>
                </div>
                <div className="flex gap-2">
                  {/* Views bar */}
                  <div className="flex-[4] bg-cream-dark rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gold transition-all duration-500"
                      style={{ width: `${(row.views / maxTrend) * 100}%` }}
                    />
                  </div>
                  {/* Leads bar */}
                  <div className="flex-1 bg-cream-dark rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                      style={{ width: `${(row.leads / maxLeads) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
            {/* Legend */}
            <div className="flex gap-5 mt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 rounded-full bg-gold inline-block" /> Visualizações
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 rounded-full bg-indigo-500 inline-block" /> Leads
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
