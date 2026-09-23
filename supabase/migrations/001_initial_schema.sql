-- ============================================================
-- Supabase SQL: Schema untuk Simple Expense Tracker
-- Berdasarkan SRS: srs_expense_tracker.md
-- ============================================================

-- ============================================================
-- 1. TABEL: users
-- Menyimpan data akun pengguna (FR-1.1 Register)
-- Supabase Auth sudah menyediakan tabel auth.users secara 
-- otomatis, namun kita butuh tabel "profiles" terpisah untuk 
-- menyimpan data tambahan seperti nama lengkap.
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ============================================================
-- 2. TABEL: transactions
-- Menyimpan data transaksi keuangan pengguna (FR-3 CRUD)
-- Setiap transaksi terikat dengan user_id (NFR-1.1)
-- ============================================================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  amount NUMERIC(15, 2) NOT NULL CHECK (amount > 0),
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT DEFAULT '' NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index untuk mempercepat query transaksi per user dan filter
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(user_id, type);
CREATE INDEX idx_transactions_date ON transactions(user_id, date DESC);

-- ============================================================
-- 3. ROW LEVEL SECURITY (RLS)
-- Memastikan setiap pengguna HANYA bisa mengakses dan
-- mengelola data miliknya sendiri (NFR-1.1 & NFR-1.2)
-- ============================================================

-- Aktifkan RLS pada tabel profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- User hanya bisa melihat dan mengubah profil miliknya sendiri
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Aktifkan RLS pada tabel transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- User hanya bisa SELECT transaksi miliknya (FR-3.2, NFR-1.2)
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

-- User hanya bisa INSERT transaksi untuk dirinya sendiri (FR-3.1)
CREATE POLICY "Users can create own transactions"
  ON transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User hanya bisa UPDATE transaksi miliknya (FR-3.3, NFR-1.2)
CREATE POLICY "Users can update own transactions"
  ON transactions FOR UPDATE
  USING (auth.uid() = user_id);

-- User hanya bisa DELETE transaksi miliknya (FR-3.4, NFR-1.2)
CREATE POLICY "Users can delete own transactions"
  ON transactions FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- 4. TRIGGER: auto-update updated_at pada transactions
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 5. TRIGGER: auto-create profile saat user register via
--    Supabase Auth (FR-1.1)
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
