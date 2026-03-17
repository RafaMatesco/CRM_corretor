import { Globe, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AdminNav({ user, onLogout, onViewPublic }) {
  return (
    <nav className="sticky top-0 z-40 h-16 bg-navy border-b border-white/10 flex items-center px-6 gap-4">
      <span className="font-display text-2xl font-bold text-white">
        Imo<span className="text-gold">CRM</span>
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
