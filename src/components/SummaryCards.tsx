import React from "react";
import { Wallet, ArrowDownLeft, ArrowUpRight } from "lucide-react";

export interface SummaryCardsProps {
  currentBalance: number;
  totalIncome: number;
  totalExpense: number;
}

/**
 * Format number into Indonesian Rupiah (IDR) currency format.
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function SummaryCards({
  currentBalance = 0,
  totalIncome = 0,
  totalExpense = 0,
}: SummaryCardsProps) {
  const cards = [
    {
      title: "Saldo Saat Ini",
      amount: formatCurrency(currentBalance),
      icon: Wallet,
      iconBg: "bg-[#6366F1]/10 text-[#6366F1]",
      badge: currentBalance >= 0 ? "Kondisi Sehat" : "Defisit",
      badgeColor:
        currentBalance >= 0
          ? "bg-[#10B981]/10 text-[#10B981]"
          : "bg-[#EF4444]/10 text-[#EF4444]",
    },
    {
      title: "Total Pemasukan",
      amount: `+${formatCurrency(totalIncome)}`,
      icon: ArrowDownLeft,
      iconBg: "bg-[#10B981]/10 text-[#10B981]",
      badge: "Bulan ini",
      badgeColor: "bg-[#E8E8EC]/60 dark:bg-[#26262A] text-[#6B6B6B] dark:text-[#9C9C9C]",
    },
    {
      title: "Total Pengeluaran",
      amount: `-${formatCurrency(totalExpense)}`,
      icon: ArrowUpRight,
      iconBg: "bg-[#EF4444]/10 text-[#EF4444]",
      badge: "Bulan ini",
      badgeColor: "bg-[#E8E8EC]/60 dark:bg-[#26262A] text-[#6B6B6B] dark:text-[#9C9C9C]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-[12px] bg-white dark:bg-[#141416] border border-[#E8E8EC] dark:border-[#26262A] p-6 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] cursor-default"
          >
            {/* Header Kartu: Label Judul & Icon */}
            <div className="flex items-center justify-between gap-2">
              <span className="font-['DM_Sans',sans-serif] text-[14px] font-medium text-[#6B6B6B] dark:text-[#9C9C9C]">
                {card.title}
              </span>
              <div
                className={`w-8 h-8 rounded-[6px] ${card.iconBg} flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Nominal Saldo: 32px, General Sans Bold, -0.03em letter spacing */}
            <div className="mt-4">
              <span className="font-['General_Sans',sans-serif] font-bold text-[32px] tracking-[-0.03em] leading-tight text-[#0A0A0A] dark:text-[#FAFAFA] block truncate">
                {card.amount}
              </span>
            </div>

            {/* Footer Kartu: Pill status / keterangan */}
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide ${card.badgeColor}`}
              >
                {card.badge}
              </span>
              <span className="font-['DM_Sans',sans-serif] text-[12px] text-[#9C9C9C]">
                Terakhir diperbarui hari ini
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

