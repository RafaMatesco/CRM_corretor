-- Migração para adicionar os dados do proprietário na tabela de propriedades
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS owner_name text,
ADD COLUMN IF NOT EXISTS owner_phone text;
