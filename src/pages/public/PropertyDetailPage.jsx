import { useState, useEffect } from 'react'
import { ArrowLeft, MapPin, Bed, Bath, Car, Maximize2, CheckCircle, Phone, Mail, Share2, ImageIcon, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { LeadModal } from '@/components/public/LeadModal'
import { PublicNav } from '@/components/public/PublicNav'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice, formatAddress, whatsappUrl } from '@/lib/utils'
import { BROKER_NAME, BROKER_CRECI, BROKER_EMAIL, WHATSAPP_NUMBER } from '@/lib/constants'
import { PROPERTY_STATUSES, PROPERTY_PURPOSES } from '@/lib/constants'

export function PropertyDetailPage({ property, onBack, onAdminClick, onLead, onRecordView }) {
  const [showLead, setShowLead] = useState(false)
  const [copied, setCopied] = useState(false)

  // Gallery state
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => { onRecordView?.(property.id) }, [property.id])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Gallery functions
  const openGallery = (index = 0) => {
    setCurrentImageIndex(index)
    setGalleryOpen(true)
  }
  const nextImage = () => {
    if (!property?.images) return
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }
  const prevImage = () => {
    if (!property?.images) return
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const waUrl = whatsappUrl(
    WHATSAPP_NUMBER,
    `Olá! Vi o imóvel "${property.title}" no site. Valor: ${formatPrice(property.price)}. Posso ter mais informações?`
  )

  const specs = [
    { icon: Bed, label: 'Quartos', value: property.bedrooms, show: property.bedrooms > 0 },
    { icon: Bath, label: 'Banheiros', value: property.bathrooms, show: property.bathrooms > 0 },
    { icon: Maximize2, label: 'Área do Imóvel', value: `${property.area} m²`, show: !!property.area },
    { icon: Maximize2, label: 'Área do Terreno', value: `${property.land_area} m²`, show: !!property.land_area },
    { icon: Car, label: 'Vagas', value: property.parking, show: property.parking > 0 },
  ]

  return (
    <div className="min-h-screen bg-cream">
      <PublicNav onAdminClick={onAdminClick} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft size={15} /> Voltar</Button>
            <span className="text-xs text-gray-400 hidden sm:inline">Imóveis / <span className="text-navy">{property.title}</span></span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleShare} className="gap-2 text-navy hover:text-gold">
            <Share2 size={16} />
            {copied ? 'Copiado!' : 'Compartilhar'}
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 pb-28">
        {/* Photos */}
        <div className="relative grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2 rounded-2xl overflow-hidden mb-10 group">
          {property.images?.[0] ? (
            <img 
              src={property.images[0]} 
              alt={property.title} 
              className="w-full h-96 object-cover cursor-pointer hover:opacity-95 transition-opacity" 
              onClick={() => openGallery(0)} 
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-400">Sem foto</div>
          )}
          
          <div className="hidden md:grid grid-rows-2 gap-2 relative">
            {property.images?.[1] ? (
              <img 
                src={property.images[1]} 
                alt="" 
                className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity" 
                style={{ height: 188 }} 
                onClick={() => openGallery(1)} 
              />
            ) : (
              <div className="w-full h-full bg-gray-100" style={{ height: 188 }} />
            )}
            
            {property.images?.[2] ? (
              <div 
                className="relative w-full h-full cursor-pointer hover:opacity-95 transition-opacity" 
                style={{ height: 188 }} 
                onClick={() => openGallery(2)}
              >
                <img src={property.images[2]} alt="" className="w-full h-full object-cover" />
                {property.images.length > 3 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors hover:bg-black/60">
                    <span className="text-white font-semibold text-lg">
                      + {property.images.length - 3} fotos
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full bg-gray-100" style={{ height: 188 }} />
            )}
          </div>

          {/* Floating buttons for gallery */}
          {property.images?.length > 0 && (
            <>
              <button 
                onClick={() => openGallery(0)}
                className="absolute bottom-4 right-4 md:hidden bg-white/90 backdrop-blur text-navy font-semibold px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm z-10"
              >
                <ImageIcon size={16} /> 1 / {property.images.length}
              </button>
              
              <button 
                onClick={() => openGallery(0)}
                className="absolute bottom-4 right-4 hidden md:flex bg-white/90 backdrop-blur hover:bg-white text-navy font-semibold px-4 py-2 rounded-lg shadow-lg items-center gap-2 transition-colors z-10"
              >
                <ImageIcon size={18} /> Mostrar todas as fotos
              </button>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge color="navy">{property.type}</Badge>
              {property.purpose && PROPERTY_PURPOSES[property.purpose] && (
                <Badge color={PROPERTY_PURPOSES[property.purpose].color}>
                  {PROPERTY_PURPOSES[property.purpose].label}
                </Badge>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-navy mb-2">{property.title}</h1>
            <p className="flex items-center gap-1.5 text-gray-400 text-sm mb-8">
              <MapPin size={14} className="shrink-0" /> {formatAddress(property)}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {specs.filter((s) => s.show).map((s) => (
                <div key={s.label} className="bg-cream rounded-xl p-4 text-center">
                  <s.icon size={20} className="mx-auto mb-2 text-gold" />
                  <p className="font-display text-xl font-semibold text-navy">{s.value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <h2 className="font-display text-xl font-semibold mb-3">Descrição</h2>
            <p className="text-gray-500 leading-relaxed text-[15px] mb-8">{property.description}</p>

            {property.features?.length > 0 && (
              <>
                <h2 className="font-display text-xl font-semibold mb-4">Diferenciais</h2>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((f) => (
                    <span key={f} className="flex items-center gap-1.5 bg-cream-dark rounded-full px-3 py-1.5 text-sm text-gray-600">
                      <CheckCircle size={13} className="text-green-600" /> {f}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right – Sticky CTAs */}
          <div className="flex flex-col gap-4">
            <div className="bg-navy rounded-2xl p-6 flex flex-col gap-3">
              <p className="text-white/50 text-xs uppercase tracking-wider">Valor</p>
              <p className="font-display text-3xl font-bold text-white">{formatPrice(property.price)}</p>
              {(property.condominium > 0 || property.iptu > 0) && (
                <div className="flex flex-col gap-1 -mt-1 mb-2">
                  {property.condominium > 0 && <p className="text-white/70 text-sm">Condomínio: {formatPrice(property.condominium)}</p>}
                  {property.iptu > 0 && <p className="text-white/70 text-sm">IPTU: {formatPrice(property.iptu)}</p>}
                </div>
              )}
              <hr className="border-white/15" />
              <p className="font-display text-lg text-white mb-1">Tenho Interesse</p>
              <p className="text-white/50 text-xs mb-2">O corretor entrará em contato em até 24h.</p>
              <Button variant="gold" size="lg" className="w-full" onClick={() => setShowLead(true)}>
                📩 Quero ser contatado
              </Button>
              <a href={waUrl} target="_blank" rel="noreferrer">
                <Button variant="whatsapp" size="lg" className="w-full">
                  💬 Falar no WhatsApp
                </Button>
              </a>
            </div>

            {/* Broker card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center text-white font-display font-bold text-base">
                  CR
                </div>
                <div>
                  <p className="font-semibold text-sm">{BROKER_NAME}</p>
                  <p className="text-xs text-gray-400">Corretor · CRECI {BROKER_CRECI}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                <span className="flex items-center gap-2"><Phone size={12} /> {import.meta.env.VITE_WHATSAPP_NUMBER ?? '(11) 9 9999-9999'}</span>
                <span className="flex items-center gap-2"><Mail size={12} /> {BROKER_EMAIL}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-100 px-4 py-3 flex gap-3 shadow-xl z-40">
        <Button variant="outline" className="flex-1" onClick={() => setShowLead(true)}>Tenho Interesse</Button>
        <a href={waUrl} target="_blank" rel="noreferrer" className="flex-1">
          <Button variant="whatsapp" className="w-full">WhatsApp</Button>
        </a>
      </div>

      {showLead && (
        <LeadModal property={property} onClose={() => setShowLead(false)} onSubmit={onLead} />
      )}

      {/* Gallery Modal */}
      {galleryOpen && property.images && property.images.length > 0 && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <button 
            onClick={() => setGalleryOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-black/50 p-2 rounded-full transition-colors z-10"
            title="Fechar"
          >
            <X size={24} />
          </button>
          
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/70 font-display tracking-widest text-sm z-10 bg-black/50 px-4 py-1.5 rounded-full">
            {currentImageIndex + 1} / {property.images.length}
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); prevImage() }}
            className="absolute left-4 sm:left-8 text-white/50 hover:text-white hover:scale-110 transition-all z-10 bg-black/20 hover:bg-black/50 p-2 rounded-full"
            title="Anterior"
          >
            <ChevronLeft size={36} />
          </button>
          
          <img 
            src={property.images[currentImageIndex]} 
            alt={`Foto ${currentImageIndex + 1}`} 
            className="max-w-full max-h-[85vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />

          <button 
            onClick={(e) => { e.stopPropagation(); nextImage() }}
            className="absolute right-4 sm:right-8 text-white/50 hover:text-white hover:scale-110 transition-all z-10 bg-black/20 hover:bg-black/50 p-2 rounded-full"
            title="Próxima"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  )
}
