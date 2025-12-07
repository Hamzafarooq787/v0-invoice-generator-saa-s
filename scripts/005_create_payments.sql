-- Create payments table for tracking payments received
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies - inherit from invoice ownership
CREATE POLICY "payments_select_own" ON public.payments 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.invoices 
      WHERE id = invoice_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "payments_insert_own" ON public.payments 
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.invoices 
      WHERE id = invoice_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "payments_update_own" ON public.payments 
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.invoices 
      WHERE id = invoice_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "payments_delete_own" ON public.payments 
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.invoices 
      WHERE id = invoice_id AND user_id = auth.uid()
    )
  );
