import { useMemo } from 'react'
import { StatCard } from '@/components/admin/StatCard'
import { Eye, Building2, TrendingUp, Users } from 'lucide-react'
import { LEAD_STATUSES } from '@/lib/constants'

export function AnalyticsPage({ properties, leads }) {
  const sorted     = [...properties].sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
  const maxViews   = Math.max(...sorted.map((p) => p.views ?? 0), 1)
  const totalViews = properties.reduce((a, p) => a + (p.views ?? 0), 0)

  // ── Leads por status ──────────────────────────────────────────────────
  const leadsByStatus = useMemo(() => {
    const counts = {}
    leads.forEach((l) => { counts[l.status] = (counts[l.status] ?? 0) + 1 })
    return Object.entries(LEAD_STATUSES).map(([key, { label, color }]) => ({
      key, label, color, count: counts[key] ?? 0,
    }))
  }, [leads])

  const maxLeadCount = Math.max(...leadsByStatus.map((s) => s.count), 1)

  const conversionRate = totalViews > 0
    ? ((leads.length / totalViews) * 100).toFixed(1)
    : '0.0'

  const BAR_COLORS = {
    blue: '#3B82F6', amber: '#F59E0B', navy: '#0F1B2D',
    purple: '#8B5CF6', green: '#10B981', red: '#EF4444',
  }

  return (
    <div className="fade-in">
      <div className="mb-7">
        <h1 className="font-display text-2xl font-semibold text-navy">Analytics</h1>
        <p className="text-sm text-gray-400 mt-1">Métricas de desempenho do portal.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Visualizações Totais"
          value={totalViews.toLocaleString('pt-BR')}
          icon={Eye}
          iconColor="#C9A84C"
        />
        <StatCard
          label="Imóveis Publicados"
          value={properties.filter((p) => p.is_published).length}
          icon={Building2}
          iconColor="#0F1B2D"
        />
        <StatCard
          label="Total de Leads"
          value={leads.length}
          icon={Users}
          iconColor="#6366F1"
        />
        <StatCard
          label="Taxa de Conversão"
          value={`${conversionRate}%`}
          sub="views → leads"
          icon={TrendingUp}
          iconColor="#2D7D5E"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views per property */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-sm">Visualizações por Imóvel</h3>
          </div>
          <div className="px-6 py-4 flex flex-col gap-4">
            {sorted.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">Nenhum imóvel cadastrado.</p>
            ) : sorted.map((p, i) => (
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

        {/* Leads por status */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-sm">Leads por Status</h3>
          </div>
          <div className="px-6 py-4 flex flex-col gap-4">
            {leads.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">Nenhum lead cadastrado ainda.</p>
            ) : leadsByStatus.filter((s) => s.count > 0).map((s) => (
              <div key={s.key}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-navy">{s.label}</span>
                  <span className="font-bold">{s.count}</span>
                </div>
                <div className="bg-cream-dark rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(s.count / maxLeadCount) * 100}%`,
                      background: BAR_COLORS[s.color] ?? '#0F1B2D',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
