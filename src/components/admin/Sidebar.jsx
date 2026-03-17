import { LayoutDashboard, Building2, Users, BarChart2 } from 'lucide-react'
import { cn, initials } from '@/lib/utils'

const NAV = [
  { id: 'overview',    label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'properties',  label: 'Imóveis',   Icon: Building2 },
  { id: 'leads',       label: 'Leads',     Icon: Users },
  { id: 'analytics',  label: 'Analytics', Icon: BarChart2 },
]

export function Sidebar({ active, onNav, user, newLeadsCount }) {
  return (
    <aside className="hidden md:flex flex-col w-60 bg-navy min-h-[calc(100vh-64px)] py-6 px-4 gap-1 flex-shrink-0">
      {/* Broker card */}
      <div className="flex items-center gap-3 px-3 pb-5 mb-2 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {initials(user?.name ?? 'CR')}
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-tight">{user?.name ?? 'Corretor'}</p>
          <p className="text-white/40 text-xs">CRECI {user?.creci ?? '—'}</p>
        </div>
      </div>

      <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-3 pb-1">Menu</p>

      {NAV.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onNav(id)}
          className={cn(
            'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
            active === id
              ? 'bg-gold text-white'
              : 'text-white/60 hover:bg-white/8 hover:text-white'
          )}
        >
          <Icon size={16} />
          {label}
          {id === 'leads' && newLeadsCount > 0 && (
            <span className="ml-auto bg-gold text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
              {newLeadsCount}
            </span>
          )}
        </button>
      ))}
    </aside>
  )
}
