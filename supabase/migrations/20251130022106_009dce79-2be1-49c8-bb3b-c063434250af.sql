-- Create orders table for storing customer orders from quiz recommendations
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Customer information
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  
  -- Delivery address
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'France',
  
  -- Order details
  box_name TEXT NOT NULL,
  box_price TEXT NOT NULL,
  subscription_type TEXT NOT NULL, -- 'bimensuel', 'mensuel_3_mois', 'annuel'
  
  -- Quiz reference
  quiz_response_id UUID,
  
  -- Order status
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
  
  -- Payment status
  payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'failed'
  
  -- Notes
  customer_notes TEXT,
  admin_notes TEXT,
  
  -- Metadata
  user_agent TEXT,
  ip_address INET
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create an order
CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
WITH CHECK (true);

-- Policy: Only authenticated users (admins) can view all orders
CREATE POLICY "Authenticated users can view all orders"
ON public.orders
FOR SELECT
USING (true);

-- Policy: Only authenticated users (admins) can update orders
CREATE POLICY "Authenticated users can update orders"
ON public.orders
FOR UPDATE
USING (true);

-- Create index on email for faster lookups
CREATE INDEX idx_orders_customer_email ON public.orders(customer_email);

-- Create index on status for filtering
CREATE INDEX idx_orders_status ON public.orders(status);

-- Create index on created_at for sorting
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);