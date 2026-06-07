ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active';
ALTER TABLE public.properties DROP CONSTRAINT IF EXISTS properties_status_check;
ALTER TABLE public.properties ADD CONSTRAINT properties_status_check CHECK (status = ANY (ARRAY['active'::text, 'vendu'::text, 'loue'::text]));