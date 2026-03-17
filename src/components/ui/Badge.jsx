import { cn } from '@/lib/utils'

const colors = {
  blue:   'bg-blue-100 text-blue-800',
  amber:  'bg-amber-100 text-amber-800',
  green:  'bg-green-100 text-green-800',
  red:    'bg-red-100 text-red-800',
  purple: 'bg-purple-100 text-purple-800',
  gray:   'bg-gray-100 text-gray-600',
  navy:   'bg-navy text-white',
  gold:   'bg-amber-100 text-amber-900',
}

export function Badge({ children, color = 'gray', className }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase',
      colors[color],
      className
    )}>
      {children}
    </span>
  )
}
