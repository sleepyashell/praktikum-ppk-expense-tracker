"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveMonthlyBudget } from "@/app/actions/budget";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function MonthlyBudgetForm({
  budget,
}: {
  budget: number | null;
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  async function handleSubmit(formData: FormData) {
    setMessage(null);
    setIsError(false);
    setIsSaving(true);

    try {
      const result = await saveMonthlyBudget(formData);
      if (result.error) {
        setMessage(result.error);
        setIsError(true);
        return;
      }

      setMessage("Anggaran bulan ini berhasil disimpan.");
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-content-primary">
          Anggaran Bulanan
        </h2>
        <p className="text-sm text-content-secondary">
          Tetapkan batas pengeluaran untuk bulan ini.
        </p>
      </div>

      {budget !== null && (
        <p className="mt-4 text-sm text-content-secondary">
          Anggaran tersimpan: <strong className="text-content-primary">
            {formatRupiah(budget)}
          </strong>
        </p>
      )}

      <form
        action={handleSubmit}
        className="mt-4 flex flex-col gap-3 sm:flex-row"
      >
        <label className="sr-only" htmlFor="monthly-budget-amount">
          Batas anggaran bulan ini dalam rupiah
        </label>
        <div className="flex min-w-0 flex-1 items-center rounded-md border border-border bg-background px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
          <span className="mr-2 text-sm text-content-muted">Rp</span>
          <input
            id="monthly-budget-amount"
            name="amount"
            type="number"
            min="1"
            step="1"
            defaultValue={budget ?? ""}
            placeholder="Contoh: 3000000"
            required
            className="w-full bg-transparent py-2.5 text-sm text-content-primary outline-none placeholder:text-content-muted"
          />
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-md bg-[#6366F1] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4F46E5] disabled:cursor-wait disabled:opacity-60"
        >
          {isSaving
            ? "Menyimpan..."
            : budget === null
              ? "Simpan Anggaran"
              : "Perbarui Anggaran"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm ${isError ? "text-error" : "text-content-secondary"}`}
          role="status"
        >
          {message}
        </p>
      )}
    </section>
  );
}
