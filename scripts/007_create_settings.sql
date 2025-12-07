-- Create app_settings table for global configuration
CREATE TABLE IF NOT EXISTS public.app_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can manage settings
CREATE POLICY "admin_select_settings" ON public.app_settings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "admin_insert_settings" ON public.app_settings
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "admin_update_settings" ON public.app_settings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Insert default settings
INSERT INTO public.app_settings (key, value) VALUES
  ('seo', '{"defaultTitle": "Airanko Invoice - Free Online Invoice Generator", "defaultDescription": "Create professional invoices in minutes with Airanko''s free online invoice generator. Download PDFs, customize templates, and upgrade for powerful tracking features.", "canonicalBase": "https://invoice.airanko.com"}'),
  ('captcha', '{"enabled": false, "siteKey": "", "secretKey": "", "enableOnSignup": true, "enableOnSignin": true}'),
  ('brand', '{"logoUrl": "", "primaryColor": "#0066FF", "footerText": "© 2025 Airanko. All rights reserved."}')
ON CONFLICT (key) DO NOTHING;
