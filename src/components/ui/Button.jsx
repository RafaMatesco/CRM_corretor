import { cn } from '@/lib/utils'

const variants = {
  primary:  'bg-navy text-white hover:bg-navy-mid',
  gold:     'bg-gold text-white hover:bg-gold-dark',
  outline:  'border-2 border-navy text-navy hover:bg-navy hover:text-white',
  ghost:    'border border-gray-200 text-gray-600 hover:bg-cream-dark',
  danger:   'bg-red-600 text-white hover:bg-red-700',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1da851]',
}

const sizes = {
  sm:   'px-3 py-1.5 text-xs gap-1.5',
  md:   'px-4 py-2.5 text-sm gap-2',
  lg:   'px-6 py-3.5 text-base gap-2',
  icon: 'p-2',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  as: Tag = 'button',
  ...props
}) {
  return (
    <Tag
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'whitespace-nowrap select-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </Tag>
  )
}
