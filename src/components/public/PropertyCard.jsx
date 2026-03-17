import { MapPin, Bed, Bath, Maximize2, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'

export function PropertyCard({ property, onClick }) {
  return (
    <article
      onClick={() => onClick(property)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden
                 cursor-pointer transition-all duration-300
                 hover:-translate-y-1 hover:shadow-xl hover:border-gold-light"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={property.images?.[0]}
          alt={property.title}
          className="w-full h-56 object-cover block"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Badge color="navy">{property.type}</Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-navy/70 text-white text-xs rounded-full px-2.5 py-1">
          <Eye size={11} /> {property.views ?? 0}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="font-display text-2xl font-bold text-navy">{formatPrice(property.price)}</p>
        <h3 className="text-base font-semibold mt-1.5 mb-1">{property.title}</h3>
        <p className="flex items-center gap-1 text-xs text-gray-400 mb-4">
          <MapPin size={12} /> {property.location}
        </p>

        {/* Features */}
        <div className="flex gap-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed size={13} /> {property.bedrooms} {property.bedrooms === 1 ? 'Quarto' : 'Quartos'}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath size={13} /> {property.bathrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize2 size={13} /> {property.area} m²
          </span>
        </div>
      </div>
    </article>
  )
}
