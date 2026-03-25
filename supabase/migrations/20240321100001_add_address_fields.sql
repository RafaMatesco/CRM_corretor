-- Migration: adiciona colunas estruturadas de endereço na tabela properties
-- Execute no SQL Editor do Supabase

alter table public.properties
  add column if not exists cep          text not null default '',
  add column if not exists street       text not null default '',
  add column if not exists number       text not null default '',
  add column if not exists complement   text not null default '',
  add column if not exists neighborhood text not null default '',
  add column if not exists city         text not null default '',
  add column if not exists state        text not null default 'SP',
  add column if not exists zone         text not null default '';

-- Atualiza os registros que já existiam e estão com os campos nulos
update public.properties
set
  cep          = coalesce(cep, ''),
  street       = coalesce(street, ''),
  number       = coalesce(number, ''),
  complement   = coalesce(complement, ''),
  neighborhood = coalesce(neighborhood, ''),
  city         = coalesce(city, ''),
  state        = coalesce(state, 'SP'),
  zone         = coalesce(zone, '')
where cep is null;
