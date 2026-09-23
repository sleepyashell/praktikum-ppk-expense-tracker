import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { getTransactions } from "@/app/actions/transactions";
import SummaryCards from "@/components/SummaryCards";
import RecentTransactions from "@/components/RecentTransactions";
import { ArrowRight, Plus } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Ambil transaksi asli dari Supabase untuk user aktif
  const transactions = await getTransactions();

  // Hitung ringkasan finansial
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-background font-body p-6 sm:p-8">
      <div className="max-w-[1000px] mx-auto space-y-8">
        {/* Header Dashboard & User Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-surface border border-border rounded-xl p-6 shadow-sm">
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

          <div className="flex items-center gap-3 shrink-0">
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

        {/* 5 Transaksi Terbaru */}
        <RecentTransactions
          transactions={transactions}
          viewAllHref="/dashboard/transactions"
        />
      </div>
    </div>
  );
}
