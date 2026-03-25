-- Migração para adicionar os campos de condomínio e iptu na tabela de propriedades
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS condominium numeric NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS iptu numeric NOT NULL DEFAULT 0;
