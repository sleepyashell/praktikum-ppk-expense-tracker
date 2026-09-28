"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import MonthYearFilter, { MonthYearFilterProps } from "@/components/MonthYearFilter";

export interface DashboardFilterProps {
  /**
   * Label di atas filter (default: 'Periode:')
   */
  label?: string;
  /**
   * Opsi daftar tahun yang tersedia (default: tahun sekarang - 2 s/d tahun sekarang)
   */
  years?: number[];
  /**
   * Optional custom styling class
   */
  className?: string;
}

/**
 * Komponen internal yang membaca dan memanipulasi URL Search Parameters
 */
function DashboardFilterContent({
  label = "Periode:",
  years,
  className = "",
}: DashboardFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Waktu lokal saat ini sebagai default fallback jika parameter URL belum ada
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1 - 12
  const currentYear = now.getFullYear();

  // Ambil nilai dari URL Search Params (?month=X&year=Y)
  const monthFromUrl = searchParams.get("month");
  const yearFromUrl = searchParams.get("year");

  const selectedMonth = monthFromUrl
    ? Math.max(1, Math.min(12, parseInt(monthFromUrl, 10) || currentMonth))
    : currentMonth;

  const selectedYear = yearFromUrl
    ? parseInt(yearFromUrl, 10) || currentYear
    : currentYear;

  // Daftar tahun default (misal: 2024, 2025, 2026)
  const availableYears = years || [currentYear - 2, currentYear - 1, currentYear];

  // Update URL Search Parameters tanpa full-page reload
  const handleFilterChange = (newMonth: number, newYear: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", newMonth.toString());
    params.set("year", newYear.toString());

    // Gunakan router.replace dengan scroll: false agar posisi layar tidak melompat ke atas
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <MonthYearFilter
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      onChange={handleFilterChange}
      label={label}
      years={availableYears}
      className={className}
    />
  );
}

/**
 * Komponen pembungkus utama dengan Suspense boundary
 * Sesuai rekomendasi Next.js App Router saat menggunakan useSearchParams()
 */
export default function DashboardFilter(props: DashboardFilterProps) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-1.5 animate-pulse">
          <div className="h-3 w-14 bg-[#E8E8EC] dark:bg-[#26262A] rounded-[4px]" />
          <div className="flex items-center gap-[12px]">
            <div className="h-[42px] w-[130px] bg-[#E8E8EC]/60 dark:bg-[#26262A] rounded-[6px]" />
            <div className="h-[42px] w-[90px] bg-[#E8E8EC]/60 dark:bg-[#26262A] rounded-[6px]" />
          </div>
        </div>
      }
    >
      <DashboardFilterContent {...props} />
    </Suspense>
  );
}
