CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  customer_name text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  district text NOT NULL,
  street text NOT NULL,
  building text NOT NULL,
  notes text,
  payment_method text NOT NULL,
  items jsonb NOT NULL,
  total_sar numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
-- No policies for anon/authenticated: orders are written only by server code and read by the owner from the database view.