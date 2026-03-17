import { clsx } from 'clsx'

/** Merge Tailwind class names safely */
export function cn(...inputs) {
  return clsx(inputs)
}

/** Format a number as BRL currency string */
export function formatPrice(value) {
  if (!value || value === 0) return 'Consulte'
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
}

/** Format an ISO date string as "12 mar. 2025" */
export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

/** Generate a URL-friendly slug from a string */
export function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 80)
}

/** Build a WhatsApp deep-link URL */
export function whatsappUrl(phone, message = '') {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

/** Initials from a full name (max 2 chars) */
export function initials(name = '') {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}
