import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDownLeft, ArrowRight } from "lucide-react";

export interface TransactionItem {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
}

export interface RecentTransactionsProps {
  transactions?: TransactionItem[];
  title?: string;
  viewAllHref?: string;
}

// Data tiruan (mock data) default 5 transaksi terakhir
const DEFAULT_MOCK_TRANSACTIONS: TransactionItem[] = [
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

/**
 * Format angka ke mata uang Rupiah (IDR).
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function RecentTransactions({
  transactions = DEFAULT_MOCK_TRANSACTIONS,
  title = "Transaksi Terbaru",
  viewAllHref = "/transactions",
}: RecentTransactionsProps) {
  return (
    <div className="rounded-[12px] bg-white dark:bg-[#141416] border border-[#E8E8EC] dark:border-[#26262A] overflow-hidden transition-all duration-200">
      {/* Header Wadah (Card Header) */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E8EC] dark:border-[#26262A]">
        <div>
          <h2 className="font-['General_Sans',sans-serif] text-[24px] font-bold tracking-[-0.03em] text-[#0A0A0A] dark:text-[#FAFAFA]">
            {title}
          </h2>
          <p className="font-['DM_Sans',sans-serif] text-[13px] text-[#6B6B6B] dark:text-[#9C9C9C] mt-0.5">
            5 aktivitas transaksi keuangan terakhir Anda
          </p>
        </div>

        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="group flex items-center gap-1.5 font-['DM_Sans',sans-serif] text-[13px] font-medium text-[#6366F1] hover:text-[#4F46E5] transition-colors"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* List Transaksi (Stacked rows with 1px dividers, 12px vert x 16px horiz padding) */}
      <div className="divide-y divide-[#E8E8EC] dark:divide-[#26262A]">
        {transactions.length === 0 ? (
          <div className="py-12 text-center text-[#9C9C9C] font-['DM_Sans',sans-serif] text-[14px]">
            Belum ada catatan transaksi terbaru.
          </div>
        ) : (
          transactions.slice(0, 5).map((item) => {
            const isIncome = item.type === "income";

            return (
              <div
                key={item.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-[#FAFAFA] dark:hover:bg-[#1C1C1F] transition-colors duration-150 cursor-pointer"
              >
                {/* Sisi Kiri: Icon, Judul/Kategori, Tanggal */}
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Icon Bulat */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      isIncome
                        ? "bg-[#10B981]/10 text-[#10B981]"
                        : "bg-[#EF4444]/10 text-[#EF4444]"
                    }`}
                  >
                    {isIncome ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>

                  {/* Judul & Detail */}
                  <div className="min-w-0">
                    <p className="font-['DM_Sans',sans-serif] text-[14px] font-medium text-[#0A0A0A] dark:text-[#FAFAFA] truncate">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 text-[12px] text-[#9C9C9C] mt-0.5">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>

                {/* Sisi Kanan: Badge Pill Status & Nominal */}
                <div className="flex items-center gap-4 shrink-0 text-right">
                  {/* Chips / Badge Status (rounded-full, 4px vert x 12px horiz padding, 12px text) */}
                  <span
                    className={`hidden sm:inline-flex items-center rounded-full px-3 py-1 text-[12px] font-medium ${
                      isIncome
                        ? "bg-[#10B981]/10 text-[#10B981]"
                        : "bg-[#EF4444]/10 text-[#EF4444]"
                    }`}
                  >
                    {isIncome ? "Pemasukan" : "Pengeluaran"}
                  </span>

                  {/* Nominal Saldo */}
                  <span
                    className={`font-['JetBrains_Mono',monospace] text-[15px] font-bold tracking-tight ${
                      isIncome ? "text-[#10B981]" : "text-[#0A0A0A] dark:text-[#FAFAFA]"
                    }`}
                  >
                    {isIncome ? `+${formatCurrency(item.amount)}` : `-${formatCurrency(item.amount)}`}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

