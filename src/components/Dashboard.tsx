import React from "react";
import { Plus } from "lucide-react";
import Layout from "@/components/Layout";
import SummaryCards from "@/components/SummaryCards";
import RecentTransactions, {
  TransactionItem,
} from "@/components/RecentTransactions";

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
}

export interface FinancialSummary {
  currentBalance: number;
  totalIncome: number;
  totalExpense: number;
}

export interface DashboardProps {
  /**
   * Data profil pengguna (nama & email).
   * Nantinya diisi dari sesi Supabase Auth / profile.
   */
  user?: UserProfile;
  /**
   * Data ringkasan finansial (total pemasukan, pengeluaran, saldo).
   * Nantinya dihitung dari query database Supabase.
   */
  summary?: FinancialSummary;
  /**
   * Daftar transaksi mutasi terbaru.
   * Nantinya diambil dari tabel `transactions` Supabase.
   */
  recentTransactions?: TransactionItem[];
  /**
   * Handler saat tombol Tambah Transaksi diklik.
   */
  onAddTransaction?: () => void;
}

// Data statis default (mock data) untuk demonstrasi sebelum integrasi Supabase
const DEFAULT_USER: UserProfile = {
  name: "Advan Workplus",
  email: "user@expensetracker.local",
};

const DEFAULT_SUMMARY: FinancialSummary = {
  currentBalance: 4750000,
  totalIncome: 6500000,
  totalExpense: 1750000,
};

const DEFAULT_TRANSACTIONS: TransactionItem[] = [
  {
    id: "tx-1",
    title: "Gaji Bulanan",
    category: "Pekerjaan",
    date: "22 Sep 2026",
    amount: 5000000,
    type: "income",
  },
  {
    id: "tx-2",
    title: "Belanja Kebutuhan Pokok",
    category: "Supermarket",
    date: "21 Sep 2026",
    amount: 750000,
    type: "expense",
  },
  {
    id: "tx-3",
    title: "Tagihan Internet & Listrik",
    category: "Utilitas",
    date: "20 Sep 2026",
    amount: 450000,
    type: "expense",
  },
  {
    id: "tx-4",
    title: "Project Freelance UI System",
    category: "Side Project",
    date: "18 Sep 2026",
    amount: 1500000,
    type: "income",
  },
  {
    id: "tx-5",
    title: "Kopi & Makan Siang",
    category: "Makanan & Minuman",
    date: "17 Sep 2026",
    amount: 85000,
    type: "expense",
  },
];

export default function Dashboard({
  user = DEFAULT_USER,
  summary = DEFAULT_SUMMARY,
  recentTransactions = DEFAULT_TRANSACTIONS,
  onAddTransaction,
}: DashboardProps) {
  return (
    <Layout>
      <div className="w-full animate-in fade-in duration-300">
        {/* Sapaan Pengguna (General Sans 32px - Section Heading) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="font-['DM_Sans',sans-serif] text-[11px] font-semibold tracking-wider uppercase text-[#6B6B6B] dark:text-[#9C9C9C]">
              Ikhtisar Keuangan Pribadi
            </span>
            <h1 className="font-['General_Sans',sans-serif] text-[32px] font-bold tracking-[-0.03em] leading-tight text-[#0A0A0A] dark:text-[#FAFAFA] mt-1">
              Halo, {user.name}
            </h1>
            <p className="font-['DM_Sans',sans-serif] text-[14px] text-[#6B6B6B] dark:text-[#9C9C9C] mt-1">
              Pantau arus kas, ringkasan saldo, dan mutasi pengeluaran terbaru Anda.
            </p>
          </div>

          {/* Primary Action Button (Genesis specs: 6px radius, indigo fill, hover lift) */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={onAddTransaction}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-[#6366F1] hover:bg-[#4F46E5] text-white font-['DM_Sans',sans-serif] text-[14px] font-medium transition-all duration-150 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(99,102,241,0.35)] active:translate-y-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Transaksi</span>
            </button>
          </div>
        </div>

        {/* Komponen SummaryCards dengan jarak vertikal mt-8 (32px dalam 4px grid) */}
        <div className="mt-8">
          <SummaryCards
            currentBalance={summary.currentBalance}
            totalIncome={summary.totalIncome}
            totalExpense={summary.totalExpense}
          />
        </div>

        {/* Komponen RecentTransactions dengan jarak vertikal mt-12 (48px dalam 4px grid) */}
        <div className="mt-12">
          <RecentTransactions transactions={recentTransactions} />
        </div>
      </div>
    </Layout>
  );
}

