import { useState } from 'react'
import { Search, X, SlidersHorizontal, Check } from 'lucide-react'
import { Select, Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { PROPERTY_TYPES, PROPERTY_PURPOSES } from '@/lib/constants'

export function PropertyFilters({ filters, onChange, zones = [], availableFeatures = [] }) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const set = (k) => (e) => onChange({ ...filters, [k]: e.target.value })
  
  const setNumberMask = (k) => (e) => {
    const raw = e.target.value.replace(/\D/g, '')
    if (!raw) {
      onChange({ ...filters, [k]: '' })
      return
    }
    const formatted = 'R$ ' + Number(raw).toLocaleString('pt-BR')
    onChange({ ...filters, [k]: formatted })
  }

  const toggleFeature = (f) => {
    const updated = filters.features.includes(f)
      ? filters.features.filter(v => v !== f)
      : [...filters.features, f]
    onChange({ ...filters, features: updated })
  }

  const clear = () => onChange({
    search: '', type: '', purpose: '', bedrooms: '', zone: '',
    minPrice: '', maxPrice: '', minArea: '', maxArea: '', bathrooms: '', parking: '', features: []
  })

  const hasFilters = filters.search || filters.type || filters.purpose || filters.bedrooms || filters.zone ||
                     filters.minPrice || filters.maxPrice || filters.minArea || filters.maxArea ||
                     filters.bathrooms || filters.parking || filters.features.length > 0

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg px-6 py-5 flex flex-col gap-4">
      <div className="flex flex-wrap gap-3 items-end">
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

      {/* Purpose */}
      <div className="min-w-[130px]">
        <Select label="Modalidade" value={filters.purpose} onChange={set('purpose')}>
          <option value="">Todos</option>
          {Object.entries(PROPERTY_PURPOSES).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </Select>
      </div>

      {/* Zone */}
      {zones.length > 0 && (
        <div className="min-w-[140px]">
          <Select label="Zona" value={filters.zone} onChange={set('zone')}>
            <option value="">Todas</option>
            {zones.map((z) => <option key={z} value={z}>{z}</option>)}
          </Select>
        </div>
      )}

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

      {/* Toggle Advanced */}
      <Button
        variant={showAdvanced ? 'gray' : 'ghost'}
        size="md"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className={showAdvanced ? 'bg-gray-100' : ''}
      >
        <SlidersHorizontal size={14} /> Mais Filtros
      </Button>

      {/* Clear */}
      {hasFilters && (
        <Button variant="ghost" size="md" onClick={clear} className="text-red-500 hover:text-red-600 hover:bg-red-50">
          <X size={14} /> Limpar
        </Button>
      )}
      </div>

      {/* ── Advanced Panel ──────────────────────────────────────────────── */}
      {showAdvanced && (
        <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in slide-in-from-top-2 duration-200">
          
          {/* Price Range */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Valor (R$)</span>
            <div className="flex items-center gap-2">
              <input
                className="w-full px-3 py-2 rounded-lg border-[1.5px] border-gray-200 text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder="De:"
                value={filters.minPrice}
                onChange={setNumberMask('minPrice')}
              />
              <span className="text-gray-300">-</span>
              <input
                className="w-full px-3 py-2 rounded-lg border-[1.5px] border-gray-200 text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder="Até:"
                value={filters.maxPrice}
                onChange={setNumberMask('maxPrice')}
              />
            </div>
          </div>

          {/* Area Range */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Área (m²)</span>
            <div className="flex items-center gap-2">
              <input
                type="number" min="0"
                className="w-full px-3 py-2 rounded-lg border-[1.5px] border-gray-200 text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder="Mínimo"
                value={filters.minArea}
                onChange={set('minArea')}
              />
              <span className="text-gray-300">-</span>
              <input
                type="number" min="0"
                className="w-full px-3 py-2 rounded-lg border-[1.5px] border-gray-200 text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder="Máximo"
                value={filters.maxArea}
                onChange={set('maxArea')}
              />
            </div>
          </div>

          {/* Bathrooms Grid */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Banheiros</span>
            <div className="flex flex-wrap gap-1">
              {[ '1', '2', '3', '4', '5' ].map(n => (
                <button
                  key={n}
                  onClick={() => onChange({ ...filters, bathrooms: filters.bathrooms === n ? '' : n })}
                  className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${filters.bathrooms === n ? 'bg-gold text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {n}+
                </button>
              ))}
            </div>
          </div>

          {/* Parking Grid */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Vagas</span>
            <div className="flex flex-wrap gap-1">
              {[ '1', '2', '3', '4', '5' ].map(n => (
                <button
                  key={n}
                  onClick={() => onChange({ ...filters, parking: filters.parking === n ? '' : n })}
                  className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${filters.parking === n ? 'bg-gold text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {n}+
                </button>
              ))}
            </div>
          </div>

          {/* Features Checkboxes (Available only if properties have features) */}
          {availableFeatures.length > 0 && (
            <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-3 xl:col-span-4 mt-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Comodidades e Lazer</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-3 gap-x-4">
                {availableFeatures.map(feat => {
                  const isChecked = filters.features.includes(feat)
                  return (
                    <label key={feat} className="flex items-start gap-2 cursor-pointer group">
                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${isChecked ? 'bg-gold border-gold text-white' : 'border-gray-300 bg-white group-hover:border-gold'}`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span className="text-sm text-gray-600 select-none line-clamp-1" title={feat}>{feat}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
