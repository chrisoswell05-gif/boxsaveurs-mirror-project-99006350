-- Create promo_codes table
CREATE TABLE public.promo_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC NOT NULL CHECK (discount_value > 0),
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT now(),
  valid_until TIMESTAMP WITH TIME ZONE,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active promo codes (for validation)
CREATE POLICY "Anyone can read active promo codes"
  ON public.promo_codes
  FOR SELECT
  USING (is_active = true);

-- Only authenticated users can manage promo codes (admin)
CREATE POLICY "Authenticated users can manage promo codes"
  ON public.promo_codes
  FOR ALL
  USING (auth.uid() IS NOT NULL);

-- Insert some example promo codes
INSERT INTO public.promo_codes (code, description, discount_type, discount_value, max_uses)
VALUES 
  ('BIENVENUE10', 'Réduction de 10% pour les nouveaux clients', 'percentage', 10, 100),
  ('BIENVENUE20', 'Réduction de 20% pour les nouveaux clients', 'percentage', 20, 50),
  ('PROMO5', 'Réduction de 5$ sur votre commande', 'fixed', 5, 200);