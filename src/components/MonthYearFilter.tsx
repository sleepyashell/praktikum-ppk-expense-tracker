import React from "react";
import { ChevronDown } from "lucide-react";

export interface MonthYearFilterProps {
  /**
   * Bulan yang dipilih (1 = Januari, ..., 12 = Desember)
   * Default: Bulan saat ini
   */
  selectedMonth?: number;
  /**
   * Tahun yang dipilih (misal: 2026)
   * Default: Tahun saat ini
   */
  selectedYear?: number;
  /**
   * Callback saat bulan atau tahun berubah
   */
  onChange?: (month: number, year: number) => void;
  /**
   * Label di atas filter (default: 'Periode:')
   */
  label?: string;
  /**
   * Opsi daftar tahun (default: 2024 - 2026)
   */
  years?: number[];
  /**
   * Optional custom styling untuk wrapper
   */
  className?: string;
}

const MONTHS = [
  { value: 1, label: "Januari" },
  { value: 2, label: "Februari" },
  { value: 3, label: "Maret" },
  { value: 4, label: "April" },
  { value: 5, label: "Mei" },
  { value: 6, label: "Juni" },
  { value: 7, label: "Juli" },
  { value: 8, label: "Agustus" },
  { value: 9, label: "September" },
  { value: 10, label: "Oktober" },
  { value: 11, label: "November" },
  { value: 12, label: "Desember" },
];

const DEFAULT_YEARS = [2024, 2025, 2026];

export default function MonthYearFilter({
  selectedMonth = 9, // September default
  selectedYear = 2026,
  onChange,
  label = "Periode:",
  years = DEFAULT_YEARS,
  className = "",
}: MonthYearFilterProps) {
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    onChange?.(newMonth, selectedYear);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    onChange?.(selectedMonth, newYear);
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label kecil di atas dropdown (Genesis Caption 12px, #6B6B6B) */}
      {label && (
        <label className="font-['DM_Sans',sans-serif] text-[12px] font-medium text-[#6B6B6B] dark:text-[#9C9C9C]">
          {label}
        </label>
      )}

      {/* Flex container dropdown bersebelahan dengan gap 12px */}
      <div className="flex items-center gap-[12px]">
        {/* Dropdown Pilihan Bulan */}
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            aria-label="Pilih Bulan"
            className="appearance-none cursor-pointer bg-white dark:bg-[#141416] border border-[#E8E8EC] dark:border-[#26262A] rounded-[6px] py-[10px] pl-[14px] pr-9 font-['DM_Sans',sans-serif] text-[14px] text-[#0A0A0A] dark:text-[#FAFAFA] transition-all duration-150 outline-none focus:border-[#6366F1] focus:ring-[3px] focus:ring-[#6366F1]/12 hover:border-[#9C9C9C]/50"
          >
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C9C9C] pointer-events-none" />
        </div>

        {/* Dropdown Pilihan Tahun */}
        <div className="relative">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            aria-label="Pilih Tahun"
            className="appearance-none cursor-pointer bg-white dark:bg-[#141416] border border-[#E8E8EC] dark:border-[#26262A] rounded-[6px] py-[10px] pl-[14px] pr-9 font-['DM_Sans',sans-serif] text-[14px] text-[#0A0A0A] dark:text-[#FAFAFA] transition-all duration-150 outline-none focus:border-[#6366F1] focus:ring-[3px] focus:ring-[#6366F1]/12 hover:border-[#9C9C9C]/50"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C9C9C] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
