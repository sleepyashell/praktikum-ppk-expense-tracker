"use client";

import React from "react";
import { ShieldCheck, AlertTriangle, AlertCircle } from "lucide-react";

export interface BudgetProgressBarProps {
  totalIncome: number;
  totalExpense: number;
}

/**
 * Format angka ke mata uang Rupiah
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function BudgetProgressBar({
  totalIncome = 0,
  totalExpense = 0,
}: BudgetProgressBarProps) {
  // Hitung persentase rasio pengeluaran terhadap pemasukan
  const rawPercentage =
    totalIncome > 0
      ? Math.round((totalExpense / totalIncome) * 100)
      : totalExpense > 0
      ? 100
      : 0;

  // Batasi lebar visual progress bar max 100%
  const barWidth = Math.min(rawPercentage, 100);

  // Tentukan status dan warna dinamis (Hijau / Kuning / Merah)
  let statusConfig = {
    label: "Aman",
    badgeBg: "bg-[#10B981]/10 text-[#10B981]",
    barBg: "bg-[#10B981]",
    borderColor: "border-[#10B981]/20",
    icon: ShieldCheck,
    description: "Penggunaan anggaran masih terukur aman dibanding total pemasukan.",
  };

  if (rawPercentage >= 100) {
    statusConfig = {
      label: "Melebihi Batas",
      badgeBg: "bg-[#EF4444]/10 text-[#EF4444]",
      barBg: "bg-[#EF4444]",
      borderColor: "border-[#EF4444]/20",
      icon: AlertCircle,
      description: "Peringatan: Total pengeluaran telah melebihi pemasukan bulan ini (Defisit)!",
    };
  } else if (rawPercentage >= 70) {
    statusConfig = {
      label: "Waspada",
      badgeBg: "bg-[#F59E0B]/10 text-[#F59E0B]",
      barBg: "bg-[#F59E0B]",
      borderColor: "border-[#F59E0B]/20",
      icon: AlertTriangle,
      description: "Pengeluaran sudah mencapai 70%+ dari total pemasukan. Harap berhati-hati.",
    };
  }

  const StatusIcon = statusConfig.icon;

  return (
    <div className="w-full rounded-[12px] bg-white dark:bg-[#141416] border border-[#E8E8EC] dark:border-[#26262A] p-6 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] cursor-default">
      {/* Header Indikator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-[6px] ${statusConfig.badgeBg}`}>
            <StatusIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-['DM_Sans',sans-serif] text-[14px] font-medium text-[#6B6B6B] dark:text-[#9C9C9C]">
              Status Penggunaan Anggaran
            </h3>
            <p className="font-['General_Sans',sans-serif] text-[16px] font-bold text-[#0A0A0A] dark:text-[#FAFAFA] tracking-tight mt-0.5">
              {statusConfig.description}
            </p>
          </div>
        </div>

        {/* Badge Status Dinamis */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <span className={`px-3 py-1 rounded-full text-[12px] font-semibold tracking-wide ${statusConfig.badgeBg}`}>
            ● {statusConfig.label} ({rawPercentage}%)
          </span>
        </div>
      </div>

      {/* Track Progress Bar */}
      <div className="relative w-full h-3 rounded-full bg-[#E8E8EC] dark:bg-[#26262A] overflow-hidden mt-6">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${statusConfig.barBg}`}
          style={{ width: `${barWidth}%` }}
        />
      </div>

      {/* Detail Nominal Bawah Progress Bar */}
      <div className="flex items-center justify-between mt-3 font-['DM_Sans',sans-serif] text-[13px] text-[#6B6B6B] dark:text-[#9C9C9C]">
        <span>
          Pengeluaran: <strong className="text-[#0A0A0A] dark:text-[#FAFAFA] font-medium">{formatCurrency(totalExpense)}</strong>
        </span>
        <span>
          Batas Pemasukan: <strong className="text-[#0A0A0A] dark:text-[#FAFAFA] font-medium">{formatCurrency(totalIncome)}</strong>
        </span>
      </div>
    </div>
  );
}
