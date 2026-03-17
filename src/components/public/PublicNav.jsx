import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function PublicNav({ onAdminClick }) {
  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
        {/* Logo */}
        <a href="#" className="flex flex-col items-center leading-none select-none">
          <span
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: '1.45rem',
              letterSpacing: '0.18em',
              color: '#1a2644',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            Imperium
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: '1.45rem',
              letterSpacing: '0.18em',
              color: '#1a2644',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            Realty
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontWeight: 400,
              fontSize: '0.55rem',
              letterSpacing: '0.35em',
              color: '#5a6a8a',
              lineHeight: 1,
              marginTop: '4px',
              textTransform: 'uppercase',
            }}
          >
            Negócios Imobiliários
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex gap-1 mx-auto">
          <a href="#catalogo" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-cream hover:text-navy transition-colors">
            Imóveis
          </a>
          <a href="#contato" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-cream hover:text-navy transition-colors">
            Contato
          </a>
        </div>

        {/* CTA */}
        <div className="ml-auto">
          <Button variant="outline" size="sm" onClick={onAdminClick}>
            <Lock size={13} /> Área do Corretor
          </Button>
        </div>
      </div>
    </nav>
  )
}
