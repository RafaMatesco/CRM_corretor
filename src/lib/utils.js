import { clsx } from 'clsx'

/** Merge Tailwind class names safely */
export function cn(...inputs) {
  return clsx(inputs)
}

/** Format a number as BRL currency string — e.g. R$ 1.250.000 */
export function formatPrice(value) {
  if (!value || value === 0) return 'Consulte'
  const integer = Math.round(Number(value))
  const formatted = integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `R$ ${formatted}`
}

/** Build a short display address from structured fields, fallback to legacy location */
export function formatAddress(p) {
  if (!p) return ''
  const parts = []
  if (p.street)       parts.push(p.number ? `${p.street}, ${p.number}` : p.street)
  if (p.neighborhood) parts.push(p.neighborhood)
  if (p.city)         parts.push(p.state ? `${p.city} – ${p.state}` : p.city)
  return parts.length > 0 ? parts.join(', ') : (p.location ?? '')
}

/** Normalize a zone string: trim + Title Case */
export function normalizeZone(z = '') {
  return z.trim().replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
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
