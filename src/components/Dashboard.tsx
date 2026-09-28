"use client";

import React, { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import Layout from "@/components/Layout";
import SummaryCards from "@/components/SummaryCards";
import RecentTransactions, {
  TransactionItem,
} from "@/components/RecentTransactions";
import DashboardFilter from "@/components/DashboardFilter";
import BudgetProgressBar from "@/components/BudgetProgressBar";

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
}

export interface DashboardProps {
  /**
   * Data profil pengguna (nama & email).
   */
  user?: UserProfile;
  /**
   * Daftar transaksi mentah. Jika tidak disediakan, gunakan mock transactions default.
   */
  initialTransactions?: TransactionItem[];
  /**
   * Handler saat tombol Tambah Transaksi diklik.
   */
  onAddTransaction?: () => void;
}

// Data user default
const DEFAULT_USER: UserProfile = {
  name: "Advan Workplus",
  email: "user@expensetracker.local",
};

// Mock data transaksi dengan berbagai bulan dan tahun untuk pengujian filter
const DEFAULT_TRANSACTIONS: TransactionItem[] = [
  // September 2026
  {
    id: "tx-1",
    title: "Gaji Bulanan",
    category: "Pekerjaan",
    date: "2026-09-22",
    amount: 5000000,
    type: "income",
  },
  {
    id: "tx-2",
    title: "Belanja Kebutuhan Pokok",
    category: "Supermarket",
    date: "2026-09-21",
    amount: 750000,
    type: "expense",
  },
  {
    id: "tx-3",
    title: "Tagihan Internet & Listrik",
    category: "Utilitas",
    date: "2026-09-20",
    amount: 450000,
    type: "expense",
  },
  {
    id: "tx-4",
    title: "Project Freelance UI System",
    category: "Side Project",
    date: "2026-09-18",
    amount: 1500000,
    type: "income",
  },
  {
    id: "tx-5",
    title: "Kopi & Makan Siang",
    category: "Makanan & Minuman",
    date: "2026-09-17",
    amount: 85000,
    type: "expense",
  },
  // Agustus 2026
  {
    id: "tx-6",
    title: "Gaji Bulanan Agustus",
    category: "Pekerjaan",
    date: "2026-08-25",
    amount: 5000000,
    type: "income",
  },
  {
    id: "tx-7",
    title: "Service Kendaraan",
    category: "Transportasi",
    date: "2026-08-14",
    amount: 350000,
    type: "expense",
  },
  {
    id: "tx-8",
    title: "Beli Perlengkapan Meja Kerja",
    category: "Elektronik",
    date: "2026-08-05",
    amount: 600000,
    type: "expense",
  },
  // Juli 2026
  {
    id: "tx-9",
    title: "Bonus Kinerja Q2",
    category: "Pekerjaan",
    date: "2026-07-15",
    amount: 2500000,
    type: "income",
  },
];

/**
 * Fungsi pembantu untuk memfilter array transaksi berdasarkan bulan & tahun
 */
function filterTransactionsByPeriod(
  transactions: TransactionItem[],
  month: number,
  year: number
): TransactionItem[] {
  return transactions.filter((t) => {
    // Parsing tanggal transaksi (format YYYY-MM-DD atau ISO string)
    const dateObj = new Date(t.date);
    const txMonth = dateObj.getMonth() + 1; // 1-12
    const txYear = dateObj.getFullYear();

    return txMonth === month && txYear === year;
  });
}

function DashboardContent({
  user = DEFAULT_USER,
  initialTransactions = DEFAULT_TRANSACTIONS,
  onAddTransaction,
}: DashboardProps) {
  const searchParams = useSearchParams();

  // Waktu lokal saat ini sebagai default fallback
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // 1. Tangkap parameter month dan year dari URL Search Params
  const monthParam = searchParams.get("month");
  const yearParam = searchParams.get("year");

  const selectedMonth = monthParam
    ? Math.max(1, Math.min(12, parseInt(monthParam, 10) || currentMonth))
    : currentMonth;

  const selectedYear = yearParam
    ? parseInt(yearParam, 10) || currentYear
    : currentYear;

  // 2. Filter transaksi sesuai periode aktif
  const filteredTransactions = useMemo(() => {
    return filterTransactionsByPeriod(
      initialTransactions,
      selectedMonth,
      selectedYear
    );
  }, [initialTransactions, selectedMonth, selectedYear]);

  // 3. Kalkulasi ulang (recalculate) nilai ringkasan finansial
  const { totalIncome, totalExpense, currentBalance } = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome: income,
      totalExpense: expense,
      currentBalance: income - expense,
    };
  }, [filteredTransactions]);

  return (
    <Layout>
      <div className="w-full animate-in fade-in duration-300">
        {/* Header: Sapaan Pengguna di Kiri & DashboardFilter di Kanan (Flexbox Space-Between) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2">
          {/* Kolom Kiri: Sapaan */}
          <div>
            <span className="font-['DM_Sans',sans-serif] text-[11px] font-semibold tracking-wider uppercase text-[#6B6B6B] dark:text-[#9C9C9C]">
              Ikhtisar Keuangan Pribadi
            </span>
            <h1 className="font-['General_Sans',sans-serif] text-[32px] font-bold tracking-[-0.03em] leading-tight text-[#0A0A0A] dark:text-[#FAFAFA] mt-1">
              Halo, {user.name}
            </h1>
            <p className="font-['DM_Sans',sans-serif] text-[14px] text-[#6B6B6B] dark:text-[#9C9C9C] mt-1">
              Pantau arus kas, ringkasan saldo, dan mutasi pengeluaran Anda.
            </p>
          </div>

          {/* Kolom Kanan: Filter Periode & Tombol Aksi */}
          <div className="flex flex-wrap items-end gap-3 shrink-0">
            {/* Filter Dropdown Bulan & Tahun */}
            <DashboardFilter />

            {/* Tombol Tambah Transaksi (Genesis specs: 6px radius, indigo fill) */}
            <button
              type="button"
              onClick={onAddTransaction}
              className="inline-flex items-center gap-2 h-[42px] px-4 rounded-[6px] bg-[#6366F1] hover:bg-[#4F46E5] text-white font-['DM_Sans',sans-serif] text-[14px] font-medium transition-all duration-150 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(99,102,241,0.35)] active:translate-y-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Transaksi</span>
            </button>
          </div>
        </div>

        {/* Komponen SummaryCards dengan nilai yang terhitung ulang (recalculated) secara dinamis */}
        <div className="mt-8">
          <SummaryCards
            currentBalance={currentBalance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
          />
        </div>

        {/* Komponen RecentTransactions menampilkan transaksi yang terfilter atau Empty State */}
        {/* Indikator Visual Penggunaan Anggaran */}
        <div className="mt-8">
          <BudgetProgressBar
            totalIncome={summary.totalIncome}
            totalExpense={summary.totalExpense}
          />
        </div>

        {/* Komponen RecentTransactions dengan jarak vertikal mt-12 (48px dalam 4px grid) */}
        <div className="mt-12">
          <RecentTransactions
            transactions={filteredTransactions}
            title={`Transaksi (${filteredTransactions.length})`}
          />
        </div>
      </div>
    </Layout>
  );
}

/**
 * Dashboard wrapper dengan Suspense boundary
 */
export default function Dashboard(props: DashboardProps) {
  return (
    <Suspense
      fallback={
        <Layout>
          <div className="w-full py-12 text-center text-[#9C9C9C] animate-pulse">
            Memuat dasbor keuangan...
          </div>
        </Layout>
      }
    >
      <DashboardContent {...props} />
    </Suspense>
  );
}
