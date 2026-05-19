
-- Properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  area TEXT NOT NULL,
  price TEXT NOT NULL,
  price_value NUMERIC NOT NULL DEFAULT 0,
  beds INT NOT NULL DEFAULT 0,
  baths INT NOT NULL DEFAULT 0,
  sqft INT NOT NULL DEFAULT 0,
  img TEXT NOT NULL,
  gallery TEXT[] NOT NULL DEFAULT '{}',
  tag TEXT NOT NULL CHECK (tag IN ('Vente','Location')),
  type TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  features TEXT[] NOT NULL DEFAULT '{}',
  reference TEXT NOT NULL DEFAULT '',
  lat DOUBLE PRECISION NOT NULL DEFAULT 36.8665,
  lng DOUBLE PRECISION NOT NULL DEFAULT 10.1647,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Properties are publicly readable"
  ON public.properties FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert properties"
  ON public.properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own properties"
  ON public.properties FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own properties"
  ON public.properties FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER properties_set_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Storage bucket for property images (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Property images are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Users can delete their own property images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'property-images' AND owner = auth.uid());
