-- Migration: adiciona coluna purpose na tabela properties
-- Execute no SQL Editor do Supabase

alter table public.properties
  add column if not exists purpose text not null default 'venda'
    check (purpose in ('venda', 'locacao'));
