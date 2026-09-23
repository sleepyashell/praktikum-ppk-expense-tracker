import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-body text-content-primary">
      {/* Navigation: Sticky top nav dengan backdrop-blur, tinggi 56px, border bawah 1px[cite: 1] */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-surface/80 border-b border-border h-[56px] flex items-center justify-between px-6">
        <div className="font-display font-bold text-[18px] tracking-[-0.03em] text-content-primary">
          Expense Tracker
        </div>
        <div className="flex items-center gap-4">
          {/* Ghost button style untuk Login[cite: 1] */}
          <Link
            href="/login"
            className="text-[14px] font-medium text-content-secondary hover:text-content-primary transition-colors"
          >
            Sign in
          </Link>
          {/* Primary button style untuk Register[cite: 1] */}
          <Link
            href="/register"
            className="bg-primary hover:bg-primary-hover text-white rounded-md font-medium px-4 py-[8px] text-[14px] transition-all hover:-translate-y-[1px] hover:shadow-glow"
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[800px] mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="font-display text-[48px] md:text-[60px] font-bold tracking-[-0.04em] leading-tight mb-4">
            Kelola keuangan dengan{" "}
            <span className="text-primary">presisi.</span>
          </h1>
          <p className="text-content-secondary text-[18px] max-w-[600px] leading-relaxed">
            Praktikum PPK: Workspace & Tech Stack Next.js telah siap. Silakan
            lanjutkan pengembangan fitur sesuai dengan checklist yang tersedia.
          </p>
        </div>

        {/* Card Component dengan radius 12px dan border subtle[cite: 1] */}
        <div className="bg-surface border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <h2 className="font-display text-[24px] font-bold tracking-[-0.03em] mb-6 border-b border-border pb-4">
            Checklist Fitur (Tim Developer)
          </h2>

          {/* Stacked list layout[cite: 1] */}
          <ul className="flex flex-col gap-4 text-[15px] text-content-secondary">
            <li className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0">
                ✓
              </div>
              <div>
                <strong className="text-content-primary font-medium">
                  Autentikasi:
                </strong>{" "}
                Registrasi (nama, email, password) & Login (email & password).
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0">
                ✓
              </div>
              <div>
                <strong className="text-content-primary font-medium">
                  Session & Route Protection:
                </strong>{" "}
                HTTP-only cookies, Middleware protection, dan Logout.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full border border-border bg-background flex items-center justify-center shrink-0"></div>
              <div>
                <strong className="text-content-primary font-medium">
                  Dashboard:
                </strong>{" "}
                Menampilkan nama pengguna, total saldo, total pemasukan &
                pengeluaran.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full border border-border bg-background flex items-center justify-center shrink-0"></div>
              <div>
                <strong className="text-content-primary font-medium">
                  Manajemen Transaksi:
                </strong>{" "}
                Tambah, lihat, ubah (edit), dan hapus transaksi.
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
