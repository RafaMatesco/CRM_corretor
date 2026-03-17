import { Search, X } from 'lucide-react'
import { Select }    from '@/components/ui/Input'
import { Button }    from '@/components/ui/Button'
import { PROPERTY_TYPES } from '@/lib/constants'

export function PropertyFilters({ filters, onChange }) {
  const set = (k) => (e) => onChange({ ...filters, [k]: e.target.value })
  const clear = () => onChange({ search: '', type: '', bedrooms: '' })
  const hasFilters = filters.search || filters.type || filters.bedrooms

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg px-6 py-5 flex flex-wrap gap-3 items-end">
      {/* Search */}
      <div className="flex flex-col gap-1 flex-[2] min-w-[180px]">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Buscar</span>
        <div className="relative">
          <input
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border-[1.5px] border-gray-200 text-sm focus:outline-none focus:border-gold transition-colors"
            placeholder="Localização ou tipo…"
            value={filters.search}
            onChange={set('search')}
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Type */}
      <div className="min-w-[140px]">
        <Select label="Tipo" value={filters.type} onChange={set('type')}>
          <option value="">Todos</option>
          {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
        </Select>
      </div>

      {/* Bedrooms */}
      <div className="min-w-[120px]">
        <Select label="Quartos" value={filters.bedrooms} onChange={set('bedrooms')}>
          <option value="">Todos</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </Select>
      </div>

      {/* Clear */}
      {hasFilters && (
        <Button variant="ghost" size="md" onClick={clear}>
          <X size={14} /> Limpar
        </Button>
      )}
    </div>
  )
}
