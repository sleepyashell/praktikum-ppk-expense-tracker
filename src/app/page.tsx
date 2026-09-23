import { Plus } from "lucide-react";
import SummaryCards from "@/components/SummaryCards";
import RecentTransactions from "@/components/RecentTransactions";

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
      <SummaryCards
        currentBalance={4750000}
        totalIncome={6500000}
        totalExpense={1750000}
      />

      {/* Recent Transactions List Component (FR-2.3) */}
      <RecentTransactions />
    </div>
  );
}
