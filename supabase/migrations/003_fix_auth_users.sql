-- ============================================================
-- Fix: Database error querying schema (Supabase Auth 500)
-- Penyebab: GoTrue engine Supabase membutuhkan kolom token string
-- kosong (bukan NULL) dan entri di auth.identities.
-- ============================================================

-- 1. Perbaiki kolom-kolom string yang bernilai NULL pada auth.users
UPDATE auth.users 
SET 
  confirmation_token = COALESCE(confirmation_token, ''),
  recovery_token = COALESCE(recovery_token, ''),
  email_change_token_new = COALESCE(email_change_token_new, ''),
  email_change = COALESCE(email_change, ''),
  email_change_token_current = COALESCE(email_change_token_current, ''),
  phone_change = COALESCE(phone_change, ''),
  phone_change_token = COALESCE(phone_change_token, '')
WHERE confirmation_token IS NULL 
   OR recovery_token IS NULL 
   OR email_change_token_new IS NULL;

-- 2. Buat entri identitas di auth.identities (wajib untuk Supabase Auth)
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT 
  id,
  id,
  json_build_object('sub', id::text, 'email', email)::jsonb,
  'email',
  id::text,
  now(),
  created_at,
  updated_at
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM auth.identities)
ON CONFLICT (provider, provider_id) DO NOTHING;
