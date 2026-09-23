# Praktikum PPK - Personal Expense Tracker

Aplikasi pencatatan keuangan pribadi sederhana berbasis **Next.js (Full Stack)** untuk tugas Praktikum Pemrograman Perangkat Komputer (PPK).

Repositori ini telah disiapkan oleh Project Manager (PM) dengan konfigurasi tech stack lengkap dan struktur folder terstandar sehingga tim pengembang (programmers) dapat langsung melanjutkan pengerjaan fitur dan logika aplikasi.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: ESLint

---

## 🚀 Getting Started (Panduan Developer)

### 1. Clone & Masuk ke Folder Proyek
```bash
git clone git@github.com:sleepyashell/praktikum-ppk-expense-tracker.git
cd praktikum-ppk-expense-tracker
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

### 4. Build & Production Check
```bash
npm run build
npm run start
```

---

## 📁 Struktur Direktori

```text
├── public/                 # Static assets (images, icons)
├── src/
│   ├── app/                # Next.js App Router (pages, layouts, route handlers / server actions)
│   │   ├── globals.css     # Tailwind CSS styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing / Dashboard starter page
│   ├── components/         # Reusable UI components (Navbar, Modal, Cards, Table, dll.)
│   ├── lib/                # Utility & helper functions (auth, db, cookies, formatting)
│   └── types/              # Definisi TypeScript types & interfaces
├── package.json            # Daftar dependensi & script project
├── tsconfig.json           # Konfigurasi TypeScript (alias @/* -> ./src/*)
└── README.md               # Dokumentasi proyek
```

---

## 📋 Spesifikasi Kebutuhan & Use Case (Checklist Tim Pengembang)

Tim developer bertugas mengimplementasikan modul-modul berikut sesuai ketentuan praktikum:

### 1. 🔐 Autentikasi & Manajemen Pengguna
- [ ] **Registrasi Akun**: Formulir pembuatan akun baru (Nama, Email/Akun, Password aman/hashed).
- [ ] **Login Pengguna**: Autentikasi menggunakan email dan password.
- [ ] **Session Management**: Mempertahankan status login pengguna selama session berlaku (gunakan HTTP-only cookies).
- [ ] **Route Protection**: Lindungi halaman yang membutuhkan autentikasi (misal dashboard) agar tidak bisa diakses oleh pengunjung yang belum login.
- [ ] **Logout**: Mengakhiri session pengguna dan mengarahkan kembali ke halaman login.

### 2. 📊 Dashboard Keuangan
- [ ] Menampilkan sapaan / nama pengguna yang sedang aktif/login.
- [ ] Menampilkan ringkasan keuangan:
  - **Total Saldo** (Pemasukan - Pengeluaran).
  - **Total Pemasukan**.
  - **Total Pengeluaran**.
- [ ] Menampilkan daftar riwayat transaksi terbaru.

### 3. 💳 Manajemen Transaksi (CRUD)
- [ ] **Tambah Transaksi**: Input jenis (Pemasukan / Pengeluaran), nominal, kategori, catatan/deskripsi, dan tanggal.
- [ ] **Lihat Transaksi**: Menampilkan daftar mutasi transaksi lengkap.
- [ ] **Ubah Transaksi (Edit)**: Memperbarui data transaksi yang sudah ada.
- [ ] **Hapus Transaksi (Delete)**: Menghapus data transaksi dengan konfirmasi.

### 4. 🔍 Filter Transaksi & Preferensi Cookies
- [ ] **Filter Transaksi**: Memungkinkan pengguna memfilter daftar mutasi berdasarkan jenis:
  - Semua Transaksi
  - Hanya Pemasukan
  - Hanya Pengeluaran
- [ ] **Penyimpanan Preferensi Cookie**: Wajib menggunakan cookie untuk menyimpan minimal 1 preferensi pengguna (contoh: preferensi filter default transaksi, mata uang, atau tema visual) agar tetap tersimpan saat halaman dimuat ulang.

### 5. 🛡️ Isolasi Data (Data Privacy)
- [ ] Setiap transaksi **wajib terhubung** dengan akun/user ID yang sedang login.
- [ ] Pengguna hanya memiliki akses dan izin untuk mengelola (melihat, menambah, mengubah, menghapus) data transaksi miliknya sendiri. Data antar pengguna tidak boleh bocor atau bercampur.

---

## 🤝 Aturan & Konvensi Tim
1. **Branching**: Gunakan feature branch untuk setiap fitur (contoh: `feature/auth`, `feature/dashboard`, `feature/transaction-crud`).
2. **Commit Message**: Gunakan pesan commit yang jelas dan deskriptif.
3. **Review**: Lakukan code review / testing lokal (`npm run build`) sebelum melakukan merge ke branch `main`.
