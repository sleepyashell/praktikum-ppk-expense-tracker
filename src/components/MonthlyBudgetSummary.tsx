function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function MonthlyBudgetSummary({
  spent,
  budget,
  monthLabel,
}: {
  spent: number;
  budget: number | null;
  monthLabel: string;
}) {
  const remaining = budget === null ? null : budget - spent;
  const progress =
    budget === null ? 0 : Math.min((spent / budget) * 100, 100);
  const overBudget = remaining !== null && remaining < 0;

  return (
    <section
      aria-labelledby="monthly-budget-summary-title"
      className="rounded-xl border border-border bg-surface p-6 shadow-sm"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2
            id="monthly-budget-summary-title"
            className="text-lg font-semibold text-content-primary"
          >
            Ringkasan Anggaran
          </h2>
          <p className="text-sm text-content-secondary">{monthLabel}</p>
        </div>
        {budget !== null && (
          <p className="mt-2 text-sm text-content-secondary sm:mt-0">
            Batas anggaran: {formatRupiah(budget)}
          </p>
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-sm text-content-secondary">
            Total pengeluaran bulan ini
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-content-primary">
            {formatRupiah(spent)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-sm text-content-secondary">Sisa anggaran</p>
          {remaining === null ? (
            <p className="mt-2 text-base font-semibold text-content-primary">
              Atur anggaran bulanan untuk melihat sisanya.
            </p>
          ) : (
            <p
              className={`mt-2 text-2xl font-bold tracking-tight ${
                overBudget ? "text-error" : "text-content-primary"
              }`}
            >
              {formatRupiah(remaining)}
              {overBudget && (
                <span className="ml-2 text-sm font-medium">melebihi batas</span>
              )}
            </p>
          )}
        </div>
      </div>

      {budget !== null && (
        <div className="mt-4">
          <div
            className="h-2 overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-label="Penggunaan anggaran bulan ini"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div
              className={`h-full rounded-full transition-[width] ${
                overBudget ? "bg-error" : "bg-[#6366F1]"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-content-secondary">
            {formatRupiah(spent)} dari {formatRupiah(budget)} terpakai
          </p>
        </div>
      )}
    </section>
  );
}
