-- ============================================================
-- Seed Data: Sample Users & Transactions
-- Jalankan di Supabase SQL Editor SETELAH 001_initial_schema.sql
-- ============================================================

-- Pastikan extension pgcrypto aktif
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- ============================================================
-- 1. BUAT 3 SAMPLE USER via Supabase Auth
-- Password semua user: "password123"
-- ============================================================

-- User 1: Andi Pratama
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at, aud, role
)
VALUES (
  'a1111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'andi@example.com',
  extensions.crypt('password123', extensions.gen_salt('bf')),
  now(),
  '{"name": "Andi Pratama"}'::jsonb,
  now(), now(), 'authenticated', 'authenticated'
)
ON CONFLICT (id) DO NOTHING;

-- User 2: Budi Santoso
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at, aud, role
)
VALUES (
  'b2222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'budi@example.com',
  extensions.crypt('password123', extensions.gen_salt('bf')),
  now(),
  '{"name": "Budi Santoso"}'::jsonb,
  now(), now(), 'authenticated', 'authenticated'
)
ON CONFLICT (id) DO NOTHING;

-- User 3: Citra Dewi
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at, aud, role
)
VALUES (
  'c3333333-3333-3333-3333-333333333333',
  '00000000-0000-0000-0000-000000000000',
  'citra@example.com',
  extensions.crypt('password123', extensions.gen_salt('bf')),
  now(),
  '{"name": "Citra Dewi"}'::jsonb,
  now(), now(), 'authenticated', 'authenticated'
)
ON CONFLICT (id) DO NOTHING;

-- Fallback jika trigger belum aktif saat insert auth.users
INSERT INTO profiles (id, name, email) VALUES
('a1111111-1111-1111-1111-111111111111', 'Andi Pratama', 'andi@example.com'),
('b2222222-2222-2222-2222-222222222222', 'Budi Santoso', 'budi@example.com'),
('c3333333-3333-3333-3333-333333333333', 'Citra Dewi',   'citra@example.com')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 2. TRANSAKSI USER 1: Andi Pratama
-- ============================================================
INSERT INTO transactions (user_id, title, amount, type, category, date) VALUES
('a1111111-1111-1111-1111-111111111111', 'Gaji Bulanan September',    5000000, 'income',  'Gaji',           '2026-09-01'),
('a1111111-1111-1111-1111-111111111111', 'Freelance Desain Logo',     1500000, 'income',  'Freelance',      '2026-09-05'),
('a1111111-1111-1111-1111-111111111111', 'Makan Siang Kantin',          35000, 'expense', 'Makanan',        '2026-09-02'),
('a1111111-1111-1111-1111-111111111111', 'Kopi Starbucks',              55000, 'expense', 'Minuman',        '2026-09-03'),
('a1111111-1111-1111-1111-111111111111', 'Bayar Kos Bulanan',        1200000, 'expense', 'Tempat Tinggal',    '2026-09-01'),
('a1111111-1111-1111-1111-111111111111', 'Beli Buku Pemrograman',      150000, 'expense', 'Pendidikan',     '2026-09-07'),
('a1111111-1111-1111-1111-111111111111', 'Top Up E-Wallet',            200000, 'expense', 'Transfer',       '2026-09-10'),
('a1111111-1111-1111-1111-111111111111', 'Bonus Proyek',               750000, 'income',  'Bonus',          '2026-09-15'),
('a1111111-1111-1111-1111-111111111111', 'Belanja Bulanan Indomaret',  320000, 'expense', 'Belanja',        '2026-09-12'),
('a1111111-1111-1111-1111-111111111111', 'Nonton Bioskop',              50000, 'expense', 'Hiburan',        '2026-09-14');

-- ============================================================
-- 3. TRANSAKSI USER 2: Budi Santoso
-- ============================================================
INSERT INTO transactions (user_id, title, amount, type, category, date) VALUES
('b2222222-2222-2222-2222-222222222222', 'Gaji Bulanan September',    7000000, 'income',  'Gaji',           '2026-09-01'),
('b2222222-2222-2222-2222-222222222222', 'Bayar Listrik',              250000, 'expense', 'Utilitas',       '2026-09-05'),
('b2222222-2222-2222-2222-222222222222', 'Bayar Internet',             350000, 'expense', 'Utilitas',       '2026-09-05'),
('b2222222-2222-2222-2222-222222222222', 'Makan di Restoran',          120000, 'expense', 'Makanan',        '2026-09-08'),
('b2222222-2222-2222-2222-222222222222', 'Beli Baju Online',           275000, 'expense', 'Belanja',        '2026-09-10'),
('b2222222-2222-2222-2222-222222222222', 'Transfer dari Orang Tua',  2000000, 'income',  'Transfer',       '2026-09-11'),
('b2222222-2222-2222-2222-222222222222', 'Servis Motor',               300000, 'expense', 'Transportasi',   '2026-09-13'),
('b2222222-2222-2222-2222-222222222222', 'Bensin Motor',               100000, 'expense', 'Transportasi',   '2026-09-15');

-- ============================================================
-- 4. TRANSAKSI USER 3: Citra Dewi
-- ============================================================
INSERT INTO transactions (user_id, title, amount, type, category, date) VALUES
('c3333333-3333-3333-3333-333333333333', 'Gaji Part-Time Cafe',      2500000, 'income',  'Gaji',           '2026-09-01'),
('c3333333-3333-3333-3333-333333333333', 'Komisi Jualan Online',      800000, 'income',  'Bisnis',         '2026-09-06'),
('c3333333-3333-3333-3333-333333333333', 'Beli Skincare',             180000, 'expense', 'Perawatan',      '2026-09-03'),
('c3333333-3333-3333-3333-333333333333', 'Makan Siang Warteg',         20000, 'expense', 'Makanan',        '2026-09-04'),
('c3333333-3333-3333-3333-333333333333', 'Ongkir Shopee',              15000, 'expense', 'Belanja',        '2026-09-06'),
('c3333333-3333-3333-3333-333333333333', 'Bayar UKT Semester',      3500000, 'expense', 'Pendidikan',     '2026-09-09'),
('c3333333-3333-3333-3333-333333333333', 'Hadiah Ulang Tahun',        500000, 'income',  'Lain-lain',      '2026-09-12'),
('c3333333-3333-3333-3333-333333333333', 'Pulsa & Kuota',              75000, 'expense', 'Utilitas',       '2026-09-14'),
('c3333333-3333-3333-3333-333333333333', 'Laundry Mingguan',           30000, 'expense', 'Lain-lain',      '2026-09-15');
