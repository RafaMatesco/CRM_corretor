import { useState } from 'react'
import { PublicNav }        from '@/components/public/PublicNav'
import { PropertyCard }     from '@/components/public/PropertyCard'
import { PropertyFilters }  from '@/components/public/PropertyFilters'
import { Spinner }          from '@/components/ui/Spinner'

export function CatalogPage({ properties, loading, onSelectProperty, onAdminClick }) {
  const [filters, setFilters] = useState({ search: '', type: '', bedrooms: '' })

  const filtered = properties.filter((p) => {
    const q = filters.search.toLowerCase()
    if (q && !p.title.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q)) return false
    if (filters.type && p.type !== filters.type) return false
    if (filters.bedrooms && p.bedrooms < parseInt(filters.bedrooms)) return false
    return true
  })

  return (
    <div className="min-h-screen bg-cream">
      <PublicNav onAdminClick={onAdminClick} />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="relative bg-navy py-24 text-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80')",
          backgroundSize: 'cover', backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative max-w-2xl mx-auto px-6">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-gold mb-4">
            Imóveis de Alto Padrão
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            Encontre o imóvel<br />perfeito para você
          </h1>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            Curadoria exclusiva de imóveis residenciais e comerciais em São Paulo e litoral.
          </p>
          <a href="#catalogo"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
          >
            Ver Imóveis
          </a>
        </div>
      </section>

      {/* ── Filters ───────────────────────────────────────── */}
      <div id="catalogo" className="max-w-6xl mx-auto px-6">
        <div className="-mt-7 mb-12 relative z-10">
          <PropertyFilters filters={filters} onChange={setFilters} />
        </div>

        {/* ── Grid ────────────────────────────────────────── */}
        <div className="mb-8 flex justify-between items-baseline">
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy">Imóveis Disponíveis</h2>
            <p className="text-sm text-gray-400 mt-1">
              {loading ? 'Carregando…' : `${filtered.length} imóvel(is) encontrado(s)`}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24 text-gold"><Spinner size={36} /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">🏠</p>
            <p className="text-lg font-semibold mb-1">Nenhum imóvel encontrado</p>
            <p className="text-sm">Tente ajustar os filtros de busca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} onClick={onSelectProperty} />
            ))}
          </div>
        )}
      </div>

      {/* ── Contact section ───────────────────────────────── */}
      <section id="contato" className="bg-navy py-16">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold text-white mb-4">
              Não encontrou o que procura?
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              Conte-nos o que você precisa. Nossa equipe buscará imóveis exclusivos que atendam ao seu perfil.
            </p>
            <div className="flex gap-6 text-white/50 text-sm">
              <span>✓ Sem compromisso</span>
              <span>✓ Atendimento personalizado</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <input className="w-full px-4 py-3 rounded-xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Seu nome" />
            <input className="w-full px-4 py-3 rounded-xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-gold" placeholder="WhatsApp" />
            <textarea className="w-full px-4 py-3 rounded-xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-gold resize-none" rows={3} placeholder="Descreva o imóvel ideal…" />
            <button className="w-full bg-gold hover:bg-gold-dark text-white font-semibold py-3.5 rounded-xl transition-colors">
              Enviar mensagem
            </button>
          </div>
        </div>
      </section>

      <footer className="text-center py-10 text-sm text-gray-400 bg-cream-dark">
        <p className="font-display text-xl text-navy mb-2">Imo<span className="text-gold">CRM</span></p>
        © 2025 ImoCRM · Todos os direitos reservados
      </footer>

      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER ?? '5511999999999'}?text=Olá! Gostaria de informações sobre imóveis.`}
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform z-50"
        aria-label="WhatsApp"
      >
        💬
      </a>
    </div>
  )
}
