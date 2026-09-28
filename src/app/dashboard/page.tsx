import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { getTransactions } from "@/app/actions/transactions";
import SummaryCards from "@/components/SummaryCards";
import RecentTransactions from "@/components/RecentTransactions";
import DashboardFilter from "@/components/DashboardFilter";
import { Plus } from "lucide-react";

interface DashboardPageProps {
  searchParams: Promise<{ month?: string; year?: string }>;
}

export default async function DashboardPage(props: DashboardPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Baca searchParams dari URL (Next.js 15/16 adalah async promise)
  const resolvedParams = await props.searchParams;
  const now = new Date();
  const defaultMonth = now.getMonth() + 1;
  const defaultYear = now.getFullYear();

  const selectedMonth = resolvedParams.month
    ? parseInt(resolvedParams.month, 10) || defaultMonth
    : defaultMonth;
  const selectedYear = resolvedParams.year
    ? parseInt(resolvedParams.year, 10) || defaultYear
    : defaultYear;

  // Ambil transaksi asli dari Supabase untuk user aktif
  const allTransactions = await getTransactions();

  // Filter transaksi berdasarkan bulan & tahun yang aktif
  const filteredTransactions = allTransactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear;
  });

  // Hitung ulang (recalculate) ringkasan finansial berdasarkan data terfilter
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-background font-body p-6 sm:p-8">
      <div className="max-w-[1000px] mx-auto space-y-8">
        {/* Header Dashboard & User Bar */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 bg-surface border border-border rounded-xl p-6 shadow-sm">
          <div>
            <span className="text-[12px] font-semibold tracking-wider uppercase text-content-muted">
              Ikhtisar Keuangan Pribadi
            </span>
            <h1 className="font-display text-[26px] sm:text-[30px] font-bold tracking-[-0.03em] text-content-primary mt-1">
              Halo, {user.user_metadata?.full_name || user.email?.split("@")[0]}
            </h1>
            <p className="text-[14px] text-content-secondary mt-1">
              Pantau arus kas, ringkasan saldo, dan mutasi transaksi keuangan Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-3 shrink-0">
            {/* Filter Dropdown Bulan & Tahun */}
            <DashboardFilter />

            <Link
              href="/dashboard/transactions"
              className="inline-flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2.5 rounded-md font-medium text-sm transition-all shadow-sm hover:-translate-y-[1px]"
            >
              <Plus className="w-4 h-4" />
              <span>Kelola Transaksi</span>
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="bg-transparent border border-border text-content-secondary hover:text-content-primary hover:bg-surface rounded-md font-medium px-4 py-2 text-sm transition-all"
              >
                Log out
              </button>
            </form>
          </div>
        </div>

        {/* 3 Summary Cards: Saldo Saat Ini, Total Pemasukan, Total Pengeluaran */}
        <SummaryCards
          currentBalance={currentBalance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />

        {/* 5 Transaksi Terbaru (Filtered atau Empty State) */}
        <RecentTransactions
          transactions={filteredTransactions}
          viewAllHref="/dashboard/transactions"
        />
      </div>
    </div>
  );
}
