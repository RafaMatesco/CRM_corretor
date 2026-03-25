-- Migration: adiciona coluna land_area na tabela properties
-- Execute no SQL Editor do Supabase

alter table public.properties
  add column if not exists land_area numeric not null default 0;
