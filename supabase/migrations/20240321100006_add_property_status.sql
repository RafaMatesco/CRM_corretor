-- Migration: adiciona coluna status na tabela properties
-- Execute no SQL Editor do Supabase

alter table public.properties
  add column if not exists status text not null default 'disponivel'
    check (status in ('disponivel','vendido','alugado','desistencia','pausado','outros'));
