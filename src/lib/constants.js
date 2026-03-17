export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? '5511999999999'
export const BROKER_NAME     = import.meta.env.VITE_BROKER_NAME     ?? 'Carlos Rodrigues'
export const BROKER_CRECI    = import.meta.env.VITE_BROKER_CRECI    ?? '12345-SP'
export const BROKER_EMAIL    = import.meta.env.VITE_BROKER_EMAIL    ?? 'corretor@imobiliaria.com'

export const PROPERTY_TYPES = [
  'Apartamento', 'Casa', 'Studio', 'Cobertura', 'Terreno', 'Sala Comercial', 'Galpão',
]

export const LEAD_STATUSES = {
  novo:              { label: 'Novo',              color: 'blue'  },
  em_contato:        { label: 'Em Contato',        color: 'amber' },
  visita_agendada:   { label: 'Visita Agendada',   color: 'navy'  },
  proposta:          { label: 'Proposta',           color: 'purple'},
  fechado:           { label: 'Fechado',            color: 'green' },
  perdido:           { label: 'Perdido',            color: 'red'   },
}

export const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
]
