import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  ShieldCheck,
  Filter,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E8E8EC] dark:border-[#26262A]">
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#6B6B6B] dark:text-[#9C9C9C]">
            Overview Keuangan
          </span>
          <h1 className="text-[32px] font-['General_Sans',sans-serif] font-bold tracking-[-0.03em] text-[#0A0A0A] dark:text-[#FAFAFA] mt-1">
            Selamat Datang, Advan
          </h1>
          <p className="text-[14px] text-[#6B6B6B] dark:text-[#9C9C9C] mt-1">
            Pantau arus kas, mutasi pengeluaran, dan preferensi akun Anda.
          </p>
        </div>

        {/* Primary Action Button (Genesis specs: 6px radius, indigo fill, hover lift) */}
        <div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-[#6366F1] hover:bg-[#4F46E5] text-white text-[14px] font-medium transition-all duration-150 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(99,102,241,0.35)] active:translate-y-0"
          >
            <Plus className="w-4 h-4" />
            Tambah Transaksi
          </button>
        </div>
      </div>

      {/* Summary Cards Grid (FR-2: Saldo, Pemasukan, Pengeluaran) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Saldo Card */}
        <div className="rounded-[12px] bg-white dark:bg-[#141416] border border-[#E8E8EC] dark:border-[#26262A] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between text-[#6B6B6B] dark:text-[#9C9C9C]">
            <span className="text-[13px] font-medium">Saldo Saat Ini</span>
            <div className="w-8 h-8 rounded-[6px] bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-['JetBrains_Mono',monospace] text-[28px] font-bold tracking-tight text-[#0A0A0A] dark:text-[#FAFAFA]">
              Rp 4.750.000
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[12px] text-[#10B981]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Kondisi keuangan stabil</span>
          </div>
        </div>

        {/* Total Pemasukan Card */}
        <div className="rounded-[12px] bg-white dark:bg-[#141416] border border-[#E8E8EC] dark:border-[#26262A] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between text-[#6B6B6B] dark:text-[#9C9C9C]">
            <span className="text-[13px] font-medium">Total Pemasukan</span>
            <div className="w-8 h-8 rounded-[6px] bg-[#10B981]/10 text-[#10B981] flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-['JetBrains_Mono',monospace] text-[28px] font-bold tracking-tight text-[#10B981]">
              +Rp 6.500.000
            </span>
          </div>
          <div className="mt-2 text-[12px] text-[#6B6B6B] dark:text-[#9C9C9C]">
            Bulan ini (September 2026)
          </div>
        </div>

        {/* Total Pengeluaran Card */}
        <div className="rounded-[12px] bg-white dark:bg-[#141416] border border-[#E8E8EC] dark:border-[#26262A] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between text-[#6B6B6B] dark:text-[#9C9C9C]">
            <span className="text-[13px] font-medium">Total Pengeluaran</span>
            <div className="w-8 h-8 rounded-[6px] bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-['JetBrains_Mono',monospace] text-[28px] font-bold tracking-tight text-[#EF4444]">
              -Rp 1.750.000
            </span>
          </div>
          <div className="mt-2 text-[12px] text-[#6B6B6B] dark:text-[#9C9C9C]">
            Bulan ini (September 2026)
          </div>
        </div>
      </div>

      {/* Filter Chips & Recent Transactions (Genesis gallery-frame cards & chips) */}
      <div className="rounded-[12px] bg-white dark:bg-[#141416] border border-[#E8E8EC] dark:border-[#26262A] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-['General_Sans',sans-serif] text-[18px] font-bold tracking-[-0.02em] text-[#0A0A0A] dark:text-[#FAFAFA]">
              Transaksi Terbaru
            </h2>
            <p className="text-[13px] text-[#6B6B6B] dark:text-[#9C9C9C]">
              Mutasi 5 transaksi terakhir dari akun Anda
            </p>
          </div>

          {/* Filter Chips (Genesis: rounded-full pill shape) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#6366F1] text-white transition-colors"
            >
              Semua
            </button>
            <button
              type="button"
              className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#E8E8EC]/70 dark:bg-[#26262A] text-[#6B6B6B] dark:text-[#9C9C9C] hover:text-[#0A0A0A] dark:hover:text-[#FAFAFA] transition-colors"
            >
              Pemasukan
            </button>
            <button
              type="button"
              className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#E8E8EC]/70 dark:bg-[#26262A] text-[#6B6B6B] dark:text-[#9C9C9C] hover:text-[#0A0A0A] dark:hover:text-[#FAFAFA] transition-colors"
            >
              Pengeluaran
            </button>
          </div>
        </div>

        {/* Transaction List (Genesis List specs: stacked rows with 1px dividers, 12px x 16px padding) */}
        <div className="divide-y divide-[#E8E8EC] dark:divide-[#26262A] border-t border-[#E8E8EC] dark:border-[#26262A]">
          <div className="flex items-center justify-between py-3 px-2 hover:bg-[#FAFAFA] dark:hover:bg-[#1C1C1F] rounded-[6px] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center text-xs">
                ↓
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#0A0A0A] dark:text-[#FAFAFA]">
                  Gaji Bulanan
                </p>
                <p className="text-[12px] text-[#6B6B6B] dark:text-[#9C9C9C]">
                  22 Sep 2026 • Pendapatan
                </p>
              </div>
            </div>
            <span className="font-['JetBrains_Mono',monospace] text-[14px] font-semibold text-[#10B981]">
              +Rp 5.000.000
            </span>
          </div>

          <div className="flex items-center justify-between py-3 px-2 hover:bg-[#FAFAFA] dark:hover:bg-[#1C1C1F] rounded-[6px] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center text-xs">
                ↑
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#0A0A0A] dark:text-[#FAFAFA]">
                  Belanja Kebutuhan Bulanan
                </p>
                <p className="text-[12px] text-[#6B6B6B] dark:text-[#9C9C9C]">
                  21 Sep 2026 • Belanja
                </p>
              </div>
            </div>
            <span className="font-['JetBrains_Mono',monospace] text-[14px] font-semibold text-[#EF4444]">
              -Rp 750.000
            </span>
          </div>

          <div className="flex items-center justify-between py-3 px-2 hover:bg-[#FAFAFA] dark:hover:bg-[#1C1C1F] rounded-[6px] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center text-xs">
                ↑
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#0A0A0A] dark:text-[#FAFAFA]">
                  Langganan Internet &amp; Listrik
                </p>
                <p className="text-[12px] text-[#6B6B6B] dark:text-[#9C9C9C]">
                  20 Sep 2026 • Utilitas
                </p>
              </div>
            </div>
            <span className="font-['JetBrains_Mono',monospace] text-[14px] font-semibold text-[#EF4444]">
              -Rp 450.000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
