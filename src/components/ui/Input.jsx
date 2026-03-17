import { cn } from '@/lib/utils'

export function Input({ label, className, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</label>}
      <input
        className={cn(
          'w-full px-3.5 py-2.5 rounded-lg border-[1.5px] border-gray-200',
          'font-body text-sm text-navy bg-white',
          'focus:outline-none focus:border-gold transition-colors',
          'placeholder:text-gray-400',
          className
        )}
        {...props}
      />
    </div>
  )
}

export function Select({ label, children, className, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</label>}
      <select
        className={cn(
          'w-full px-3.5 py-2.5 rounded-lg border-[1.5px] border-gray-200',
          'font-body text-sm text-navy bg-white',
          'focus:outline-none focus:border-gold transition-colors',
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

export function Textarea({ label, className, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</label>}
      <textarea
        className={cn(
          'w-full px-3.5 py-2.5 rounded-lg border-[1.5px] border-gray-200',
          'font-body text-sm text-navy bg-white resize-y min-h-[90px]',
          'focus:outline-none focus:border-gold transition-colors',
          'placeholder:text-gray-400',
          className
        )}
        {...props}
      />
    </div>
  )
}
