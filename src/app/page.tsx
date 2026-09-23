import { CheckCircle2, Code2, ShieldCheck, Wallet } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6">
      <main className="max-w-3xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Wallet className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Expense Tracker — Praktikum PPK
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Workspace &amp; Tech Stack Next.js telah siap untuk tim pengembang.
            </p>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Tech Stack Configured
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Next.js 16 (App Router)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-500" />
              <span className="font-medium">TypeScript</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500" />
              <span className="font-medium">Tailwind CSS</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              <span className="font-medium">Lucide Icons</span>
            </div>
          </div>
        </div>

        {/* Scope & Checklist for Developers */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Checklist Fitur (Untuk Tim Developer)
          </h2>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-block w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex-shrink-0" />
              <span><strong>Autentikasi:</strong> Registrasi (nama, email, password) &amp; Login (email &amp; password).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-block w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex-shrink-0" />
              <span><strong>Session &amp; Cookies:</strong> Pertahankan session aktif dan gunakan cookies untuk minimal 1 preferensi pengguna.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-block w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex-shrink-0" />
              <span><strong>Route Protection &amp; Logout:</strong> Lindungi halaman dashboard dari akses tanpa autentikasi, serta tombol logout.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-block w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex-shrink-0" />
              <span><strong>Dashboard:</strong> Menampilkan nama pengguna, total saldo, total pemasukan &amp; pengeluaran, serta mutasi terbaru.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-block w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex-shrink-0" />
              <span><strong>Manajemen Transaksi:</strong> Tambah, lihat, ubah (edit), dan hapus transaksi.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-block w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex-shrink-0" />
              <span><strong>Filter &amp; Isolasi Data:</strong> Filter berdasarkan jenis pemasukan/pengeluaran; pastikan setiap pengguna hanya dapat melihat dan mengelola data miliknya sendiri.</span>
            </li>
          </ul>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>Silakan baca dokumentasi lengkap di file <code>README.md</code>.</p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Dev server siap dijalankan</span>
          </div>
        </div>
      </main>
    </div>
  );
}
