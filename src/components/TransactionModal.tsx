"use client";

import { useEffect, useRef, useState } from "react";
import { Transaction, TransactionType } from "@/types";

export type TransactionModalMode = "add" | "edit";

interface TransactionModalProps {
  isOpen: boolean;
  mode: TransactionModalMode;
  initialData?: Partial<Transaction>;
  onClose: () => void;
  onSubmit: (data: TransactionFormData) => Promise<void>;
}

export interface TransactionFormData {
  title: string;
  description: string;
  amount: string;
  type: TransactionType;
  category: string;
  date: string;
}

const CATEGORIES_INCOME = [
  "Gaji",
  "Freelance",
  "Bisnis",
  "Investasi",
  "Hadiah",
  "Lainnya",
];

const CATEGORIES_EXPENSE = [
  "Makan & Minum",
  "Transportasi",
  "Belanja",
  "Tagihan & Utilitas",
  "Hiburan",
  "Kesehatan",
  "Pendidikan",
  "Lainnya",
];

const DEFAULT_FORM: TransactionFormData = {
  title: "",
  description: "",
  amount: "",
  type: "expense",
  category: "",
  date: new Date().toISOString().split("T")[0],
};

export default function TransactionModal({
  isOpen,
  mode,
  initialData,
  onClose,
  onSubmit,
}: TransactionModalProps) {
  const [form, setForm] = useState<TransactionFormData>(DEFAULT_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Populate form when editing or reset when adding
  useEffect(() => {
    if (!isOpen) return;
    if (mode === "edit" && initialData) {
      setForm({
        title: initialData.title ?? "",
        description: initialData.description ?? "",
        amount: initialData.amount?.toString() ?? "",
        type: initialData.type ?? "expense",
        category: initialData.category ?? "",
        date: initialData.date ?? new Date().toISOString().split("T")[0],
      });
    } else {
      setForm(DEFAULT_FORM);
    }
    setError(null);
    // Focus first input after modal opens
    setTimeout(() => firstInputRef.current?.focus(), 50);
  }, [isOpen, mode, initialData]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const categories =
    form.type === "income" ? CATEGORIES_INCOME : CATEGORIES_EXPENSE;

  const handleTypeChange = (type: TransactionType) => {
    setForm((prev) => ({ ...prev, type, category: "" }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.title.trim()) return setError("Judul wajib diisi.");
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      return setError("Nominal harus berupa angka positif.");
    if (!form.category) return setError("Pilih kategori terlebih dahulu.");
    if (!form.date) return setError("Tanggal wajib diisi.");

    setIsLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-md rounded-xl shadow-lg overflow-hidden"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8EC" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid #E8E8EC" }}
        >
          <h2
            className="text-base font-semibold"
            style={{ color: "#0A0A0A", fontFamily: "var(--font-geist-sans)" }}
          >
            {mode === "add" ? "Tambah Transaksi" : "Edit Transaksi"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-gray-100"
            aria-label="Tutup modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#9C9C9C"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Error message */}
          {error && (
            <div
              className="rounded-md px-4 py-2.5 text-sm"
              style={{
                backgroundColor: "#FEE2E2",
                color: "#EF4444",
                border: "1px solid #FECACA",
              }}
            >
              {error}
            </div>
          )}

          {/* Tipe Transaksi — Toggle */}
          <div className="flex gap-2">
            {(["expense", "income"] as TransactionType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTypeChange(t)}
                className="flex-1 rounded-md py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-px"
                style={{
                  backgroundColor:
                    form.type === t
                      ? t === "income"
                        ? "#D1FAE5"
                        : "#FEE2E2"
                      : "#F4F4F5",
                  color:
                    form.type === t
                      ? t === "income"
                        ? "#059669"
                        : "#EF4444"
                      : "#6B6B6B",
                  border:
                    form.type === t
                      ? `1.5px solid ${t === "income" ? "#6EE7B7" : "#FECACA"}`
                      : "1.5px solid transparent",
                }}
              >
                {t === "income" ? "Pemasukan" : "Pengeluaran"}
              </button>
            ))}
          </div>

          {/* Judul */}
          <div className="space-y-1.5">
            <label
              className="block text-sm font-medium"
              style={{ color: "#0A0A0A" }}
            >
              Judul <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
              ref={firstInputRef}
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="contoh: Gaji Bulan September"
              className="w-full rounded-md px-3.5 py-2.5 text-sm outline-none transition-all"
              style={{
                border: "1px solid #E8E8EC",
                backgroundColor: "#FFFFFF",
                color: "#0A0A0A",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#6366F1";
                e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E8E8EC";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Nominal */}
          <div className="space-y-1.5">
            <label
              className="block text-sm font-medium"
              style={{ color: "#0A0A0A" }}
            >
              Nominal (Rp) <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="contoh: 1500000"
              min={1}
              className="w-full rounded-md px-3.5 py-2.5 text-sm outline-none transition-all"
              style={{
                border: "1px solid #E8E8EC",
                backgroundColor: "#FFFFFF",
                color: "#0A0A0A",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#6366F1";
                e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E8E8EC";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Kategori */}
          <div className="space-y-1.5">
            <label
              className="block text-sm font-medium"
              style={{ color: "#0A0A0A" }}
            >
              Kategori <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-md px-3.5 py-2.5 text-sm outline-none transition-all appearance-none"
              style={{
                border: "1px solid #E8E8EC",
                backgroundColor: "#FFFFFF",
                color: form.category ? "#0A0A0A" : "#9C9C9C",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#6366F1";
                e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E8E8EC";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="">Pilih kategori...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tanggal */}
          <div className="space-y-1.5">
            <label
              className="block text-sm font-medium"
              style={{ color: "#0A0A0A" }}
            >
              Tanggal <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-md px-3.5 py-2.5 text-sm outline-none transition-all"
              style={{
                border: "1px solid #E8E8EC",
                backgroundColor: "#FFFFFF",
                color: "#0A0A0A",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#6366F1";
                e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E8E8EC";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Deskripsi (opsional) */}
          <div className="space-y-1.5">
            <label
              className="block text-sm font-medium"
              style={{ color: "#0A0A0A" }}
            >
              Catatan{" "}
              <span
                className="text-xs font-normal"
                style={{ color: "#9C9C9C" }}
              >
                (opsional)
              </span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tambahkan catatan..."
              rows={2}
              className="w-full rounded-md px-3.5 py-2.5 text-sm outline-none transition-all resize-none"
              style={{
                border: "1px solid #E8E8EC",
                backgroundColor: "#FFFFFF",
                color: "#0A0A0A",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#6366F1";
                e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E8E8EC";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Footer Buttons */}
          <div
            className="flex gap-3 pt-2"
            style={{
              borderTop: "1px solid #E8E8EC",
              marginTop: "8px",
              paddingTop: "16px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-px disabled:opacity-50"
              style={{
                border: "1px solid #E8E8EC",
                backgroundColor: "transparent",
                color: "#0A0A0A",
              }}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-md px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-px disabled:opacity-50"
              style={{
                backgroundColor: "#6366F1",
                boxShadow: isLoading
                  ? "none"
                  : "0 4px 12px rgba(99,102,241,0.25)",
              }}
            >
              {isLoading
                ? "Menyimpan..."
                : mode === "add"
                  ? "Tambah Transaksi"
                  : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
