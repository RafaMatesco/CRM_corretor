-- ============================================================
--  Imperium – Supabase Schema
--  Execute no SQL Editor do seu projeto Supabase
-- ============================================================

-- ── Extensions ────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── 1. properties ─────────────────────────────────────────
create table if not exists public.properties (
  id           uuid primary key default gen_random_uuid(),
  title        text        not null,
  slug         text        unique,
  type         text        not null default 'Apartamento',
  location     text        not null,
  price        numeric     not null default 0,
  condominium  numeric     not null default 0,
  iptu         numeric     not null default 0,
  bedrooms     int         not null default 0,
  bathrooms    int         not null default 0,
  area         numeric     not null default 0,
  parking      int         not null default 0,
  description  text,
  features     text[]      default '{}',
  images       text[]      default '{}',
  owner_name   text,
  owner_phone  text,
  is_published boolean     not null default false,
  views        int         not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger trg_properties_updated_at
  before update on public.properties
  for each row execute procedure public.set_updated_at();

-- ── 2. leads ──────────────────────────────────────────────
create table if not exists public.leads (
  id             uuid primary key default gen_random_uuid(),
  name           text        not null,
  phone          text        not null,
  email          text,
  message        text,
  property_id    uuid        references public.properties(id) on delete set null,
  property_title text,                   -- denormalized for easy display
  status         text        not null default 'novo'
                             check (status in ('novo','em_contato','visita_agendada','proposta','fechado','perdido')),
  created_at     timestamptz not null default now()
);

-- ── 3. analytics ──────────────────────────────────────────
create table if not exists public.analytics (
  id          uuid primary key default gen_random_uuid(),
  property_id uuid        references public.properties(id) on delete cascade,
  user_agent  text,
  viewed_at   timestamptz not null default now()
);

-- Auto-increment property.views on analytics insert
create or replace function public.increment_property_views()
returns trigger language plpgsql as $$
begin
  update public.properties
  set views = views + 1
  where id = new.property_id;
  return new;
end $$;

create trigger trg_analytics_increment_views
  after insert on public.analytics
  for each row execute procedure public.increment_property_views();


-- ============================================================
--  Row Level Security (RLS)
-- ============================================================

-- ── properties ────────────────────────────────────────────
alter table public.properties enable row level security;

-- Anyone can read published properties (public portal)
create policy "Public can read published properties"
  on public.properties for select
  to anon
  using (is_published = true);

-- Authenticated users (corretor) have full access
create policy "Auth users full access on properties"
  on public.properties for all
  to authenticated
  using (true)
  with check (true);

-- ── leads ─────────────────────────────────────────────────
alter table public.leads enable row level security;

-- Anyone can insert a lead (lead capture form on public portal)
create policy "Public can insert leads"
  on public.leads for insert
  to anon
  with check (true);

-- Only authenticated users can read / update / delete leads
create policy "Auth users full access on leads"
  on public.leads for all
  to authenticated
  using (true)
  with check (true);

-- ── analytics ─────────────────────────────────────────────
alter table public.analytics enable row level security;

-- Anyone can insert a view event
create policy "Public can insert analytics"
  on public.analytics for insert
  to anon
  with check (true);

-- Only authenticated users can read analytics
create policy "Auth users can read analytics"
  on public.analytics for select
  to authenticated
  using (true);


-- ============================================================
--  Seed data (optional – remove in production)
-- ============================================================
insert into public.properties
  (title, slug, type, location, price, bedrooms, bathrooms, area, parking, description, features, images, is_published, views)
values
  (
    'Apartamento Alto Padrão', 'apartamento-alto-padrao-centro',
    'Apartamento', 'Centro, São Paulo – SP',
    850000, 3, 2, 120, 2,
    'Apartamento sofisticado em localização privilegiada. Acabamento de alto padrão com mármore carrara, cozinha gourmet e varanda grill.',
    array['Piscina','Academia','Varanda Grill','Portaria 24h'],
    array[
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80'
    ],
    true, 234
  ),
  (
    'Casa em Condomínio Fechado', 'casa-condominio-alphaville',
    'Casa', 'Alphaville, Barueri – SP',
    1250000, 4, 3, 280, 3,
    'Casa espaçosa em condomínio de alto padrão. Quatro suítes, escritório, sala de cinema e piscina privativa.',
    array['Piscina Privativa','Churrasqueira','Home Theater','Segurança 24h'],
    array[
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'
    ],
    true, 189
  ),
  (
    'Studio Moderno e Compacto', 'studio-moderno-vila-madalena',
    'Studio', 'Vila Madalena, São Paulo – SP',
    420000, 1, 1, 45, 1,
    'Studio completamente reformado. Mobiliado, ideal para jovens profissionais ou investidores.',
    array['Mobiliado','Próximo ao Metrô','Coworking no Condomínio'],
    array[
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80'
    ],
    true, 312
  );
