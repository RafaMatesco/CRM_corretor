export function StatCard({ label, value, sub, icon: Icon, iconColor = '#C9A84C' }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex justify-between items-start mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">{label}</span>
        {Icon && (
          <div className="p-2 rounded-lg" style={{ background: iconColor + '18' }}>
            <Icon size={16} style={{ color: iconColor }} />
          </div>
        )}
      </div>
      <p className="font-display text-3xl font-semibold text-navy leading-none">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-2">{sub}</p>}
    </div>
  )
}
