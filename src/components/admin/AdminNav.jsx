import { Globe, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AdminNav({ user, onLogout, onViewPublic }) {
  return (
    <nav className="sticky top-0 z-40 h-16 bg-navy border-b border-white/10 flex items-center px-6 gap-4">
      <span className="flex flex-col items-center leading-none select-none cursor-pointer" onClick={onViewPublic} title="Voltar ao portal">
        <span
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: '1.25rem',
            letterSpacing: '0.18em',
            color: '#ffffff',
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
            fontSize: '1.25rem',
            letterSpacing: '0.18em',
            color: '#ffffff',
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
            fontSize: '0.5rem',
            letterSpacing: '0.35em',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1,
            marginTop: '4px',
            textTransform: 'uppercase',
          }}
        >
          Negócios Imobiliários
        </span>
      </span>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="!bg-white/10 !border-white/20 !text-white/80 hover:!bg-white/20 hover:!text-white"
          onClick={onViewPublic}
        >
          <Globe size={13} /> Ver Portal
        </Button>

        <span className="text-white/40 text-sm hidden sm:block">{user?.email}</span>

        <Button
          variant="ghost"
          size="sm"
          className="!bg-white/10 !border-white/20 !text-white/70 hover:!bg-white/20 hover:!text-white"
          onClick={onLogout}
        >
          <LogOut size={13} /> Sair
        </Button>
      </div>
    </nav>
  )
}
