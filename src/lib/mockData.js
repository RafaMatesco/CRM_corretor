export const MOCK_PROPERTIES = [
  {
    id: '1', slug: 'apartamento-alto-padrao-centro',
    title: 'Apartamento Alto Padrão', type: 'Apartamento',
    location: 'Centro, São Paulo – SP', price: 850000,
    bedrooms: 3, bathrooms: 2, area: 120, parking: 2,
    description:
      'Apartamento sofisticado em localização privilegiada. Acabamento de alto padrão com mármore carrara, cozinha gourmet e varanda grill. Condomínio com piscina, academia e segurança 24h. Pronto para morar.',
    features: ['Piscina', 'Academia', 'Varanda Grill', 'Portaria 24h', 'Ar-condicionado'],
    is_published: true, views: 234,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
    ],
    created_at: '2025-01-10T10:00:00',
  },
  {
    id: '2', slug: 'casa-condominio-alphaville',
    title: 'Casa em Condomínio Fechado', type: 'Casa',
    location: 'Alphaville, Barueri – SP', price: 1250000,
    bedrooms: 4, bathrooms: 3, area: 280, parking: 3,
    description:
      'Casa espaçosa em condomínio de alto padrão, com área de lazer completa. Possui quatro suítes, escritório, sala de cinema, lavabo e piscina privativa.',
    features: ['Piscina Privativa', 'Churrasqueira', 'Home Theater', 'Jardim', 'Segurança 24h'],
    is_published: true, views: 189,
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    ],
    created_at: '2025-01-15T10:00:00',
  },
  {
    id: '3', slug: 'studio-moderno-vila-madalena',
    title: 'Studio Moderno e Compacto', type: 'Studio',
    location: 'Vila Madalena, São Paulo – SP', price: 420000,
    bedrooms: 1, bathrooms: 1, area: 45, parking: 1,
    description:
      'Studio completamente reformado com design moderno e funcional. Mobiliado e equipado, ideal para jovens profissionais ou investidores. Localização privilegiada próximo ao metrô.',
    features: ['Mobiliado', 'Próximo ao Metrô', 'Coworking no Condomínio'],
    is_published: true, views: 312,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
    ],
    created_at: '2025-02-01T10:00:00',
  },
  {
    id: '4', slug: 'cobertura-vista-mar-guaruja',
    title: 'Cobertura Duplex Vista Mar', type: 'Cobertura',
    location: 'Guarujá – SP', price: 2100000,
    bedrooms: 4, bathrooms: 4, area: 380, parking: 4,
    description:
      'Cobertura duplex exclusiva com vista 360° para o mar. Terraço privativo com piscina aquecida, área gourmet e jardim suspenso. Uma raridade no litoral paulista.',
    features: ['Vista Mar', 'Piscina Aquecida', 'Terraço Privativo', 'Jardim Suspenso'],
    is_published: true, views: 456,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80',
    ],
    created_at: '2025-02-10T10:00:00',
  },
  {
    id: '5', slug: 'apartamento-2-quartos-pinheiros',
    title: 'Apto 2 Quartos em Pinheiros', type: 'Apartamento',
    location: 'Pinheiros, São Paulo – SP', price: 620000,
    bedrooms: 2, bathrooms: 2, area: 78, parking: 1,
    description:
      'Apartamento bem localizado no coração de Pinheiros. A dois minutos a pé do metrô, com fácil acesso aos melhores restaurantes e comércios da região.',
    features: ['Próximo ao Metrô', 'Varanda', 'Portaria', 'Área de Serviço'],
    is_published: true, views: 178,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&q=80',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400&q=80',
    ],
    created_at: '2025-02-20T10:00:00',
  },
  {
    id: '6', slug: 'terreno-condominio-campinas',
    title: 'Terreno em Condomínio', type: 'Terreno',
    location: 'Sousas, Campinas – SP', price: 380000,
    bedrooms: 0, bathrooms: 0, area: 600, parking: 0,
    description:
      'Terreno plano em condomínio de alto padrão com infraestrutura completa. Localização privilegiada com ampla área verde, segurança e fácil acesso.',
    features: ['Plano', 'Área Verde', 'Segurança 24h', 'Escriturado'],
    is_published: false, views: 67,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=400&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
    ],
    created_at: '2025-03-01T10:00:00',
  },
]

export const MOCK_LEADS = [
  { id: '1', name: 'Mariana Costa',    phone: '(11) 98765-4321', email: 'mariana@email.com',  property_id: '1', property_title: 'Apartamento Alto Padrão',      message: 'Gostaria de agendar uma visita o quanto antes.',              status: 'novo',            created_at: '2025-03-14T10:30:00' },
  { id: '2', name: 'Ricardo Mendes',   phone: '(11) 91234-5678', email: 'rm@gmail.com',        property_id: '2', property_title: 'Casa em Condomínio Fechado',     message: 'Aceita entrada de 30%?',                                     status: 'em_contato',      created_at: '2025-03-13T14:20:00' },
  { id: '3', name: 'Fernanda Oliveira',phone: '(11) 96543-2109', email: '',                    property_id: '3', property_title: 'Studio Moderno e Compacto',       message: '',                                                           status: 'visita_agendada', created_at: '2025-03-12T09:00:00' },
  { id: '4', name: 'Paulo Henrique',   phone: '(11) 99876-5432', email: 'ph@empresa.com',      property_id: '4', property_title: 'Cobertura Duplex Vista Mar',       message: 'Tenho interesse para aquisição à vista.',                    status: 'proposta',        created_at: '2025-03-11T16:45:00' },
  { id: '5', name: 'Amanda Souza',     phone: '(11) 94567-8901', email: 'amanda@email.com',    property_id: '1', property_title: 'Apartamento Alto Padrão',          message: 'Posso visitar no final de semana?',                          status: 'fechado',         created_at: '2025-03-10T11:15:00' },
]
