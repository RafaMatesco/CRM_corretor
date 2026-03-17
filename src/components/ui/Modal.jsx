import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Modal({ open, onClose, title, subtitle, children, maxWidth = 'max-w-xl' }) {
  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 animate-[fadeIn_0.2s_ease]"
      onClick={onClose}
    >
      <div
        className={cn(
          'w-full bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-[slideUp_0.25s_ease]',
          maxWidth
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-7 pt-6 pb-0">
          <div>
            <h2 className="font-display text-xl font-semibold text-navy">{title}</h2>
            {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-cream-dark transition-colors text-gray-400 hover:text-navy ml-4"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-5">{children}</div>
      </div>
    </div>
  )
}
