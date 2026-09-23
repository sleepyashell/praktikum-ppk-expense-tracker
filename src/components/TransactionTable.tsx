"use client";

import { useEffect, useState } from "react";
import { Transaction, TransactionType } from "@/types";
import TransactionModal, { TransactionFormData } from "./TransactionModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterType = "all" | "income" | "expense";

interface TransactionTableProps {
  transactions: Transaction[];
  onAdd: (data: TransactionFormData) => Promise<void>;
  onEdit: (id: string, data: TransactionFormData) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

// ─── Cookie helpers (client-side, no library needed) ─────────────────────────

const COOKIE_KEY = "txFilter";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 hari

function readFilterCookie(): FilterType {
  if (typeof document === "undefined") return "all";
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_KEY}=`));
  const value = match?.split("=")[1];
  if (value === "income" || value === "expense") return value;
  return "all";
}

function writeFilterCookie(value: FilterType) {
  document.cookie = `${COOKIE_KEY}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

// ─── Formatter helpers ────────────────────────────────────────────────────────

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

// ─── Filter Tab Button ────────────────────────────────────────────────────────

function FilterTab({
  label,
  value,
  active,
  onClick,
}: {
  label: string;
  value: FilterType;
  active: boolean;
  onClick: (v: FilterType) => void;
}) {
  return (
    <button
      onClick={() => onClick(value)}
      className="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200"
      style={{
        backgroundColor: active ? "#6366F1" : "transparent",
        color: active ? "#FFFFFF" : "#6B6B6B",
        border: active ? "1px solid #6366F1" : "1px solid #E8E8EC",
      }}
    >
      {label}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TransactionTable({
  transactions,
  onAdd,
  onEdit,
  onDelete,
}: TransactionTableProps) {
  // Filter state — diinisialisasi dari cookie
  const [filter, setFilter] = useState<FilterType>("all");

  // Modal state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Transaction | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Baca cookie saat mount
  useEffect(() => {
    setFilter(readFilterCookie());
  }, []);

  // Simpan ke cookie setiap kali filter berubah
  const handleFilterChange = (value: FilterType) => {
    setFilter(value);
    writeFilterCookie(value);
  };

  // Filtered list
  const filtered =
    filter === "all"
      ? transactions
      : transactions.filter((tx) => tx.type === filter);

  // ── Delete handler ──
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await onDelete(deleteTarget.id);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  // ── Edit handler ──
  const handleEditSubmit = async (data: TransactionFormData) => {
    if (!editTarget) return;
    await onEdit(editTarget.id, data);
    setEditTarget(null);
  };

  return (
    <>
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <h2
            className="text-xl font-semibold"
            style={{ color: "#0A0A0A", fontFamily: "var(--font-geist-sans)" }}
          >
            Riwayat Transaksi
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "#9C9C9C" }}>
            {filtered.length} transaksi
            {filter !== "all"
              ? ` (${filter === "income" ? "pemasukan" : "pengeluaran"})`
              : ""}
          </p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-px self-start sm:self-auto"
          style={{
            backgroundColor: "#6366F1",
            boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Transaksi
        </button>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <FilterTab
          label="Semua"
          value="all"
          active={filter === "all"}
          onClick={handleFilterChange}
        />
        <FilterTab
          label="Pemasukan"
          value="income"
          active={filter === "income"}
          onClick={handleFilterChange}
        />
        <FilterTab
          label="Pengeluaran"
          value="expense"
          active={filter === "expense"}
          onClick={handleFilterChange}
        />
      </div>

      {/* ── Table / Empty State ── */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid #E8E8EC" }}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#E8E8EC"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-sm" style={{ color: "#9C9C9C" }}>
              Belum ada transaksi
              {filter !== "all"
                ? ` ${filter === "income" ? "pemasukan" : "pengeluaran"}`
                : ""}
              .
            </p>
            <button
              onClick={() => setAddModalOpen(true)}
              className="text-sm font-medium transition-colors"
              style={{ color: "#6366F1" }}
            >
              + Tambah sekarang
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              {/* Table Head */}
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid #E8E8EC",
                    backgroundColor: "#FAFAFA",
                  }}
                >
                  {[
                    "Tanggal",
                    "Judul",
                    "Kategori",
                    "Jenis",
                    "Nominal",
                    "Aksi",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#9C9C9C" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filtered.map((tx, i) => (
                  <tr
                    key={tx.id}
                    className="transition-colors hover:bg-gray-50"
                    style={{
                      borderBottom:
                        i < filtered.length - 1 ? "1px solid #E8E8EC" : "none",
                    }}
                  >
                    {/* Tanggal */}
                    <td
                      className="px-4 py-3.5 whitespace-nowrap"
                      style={{ color: "#6B6B6B" }}
                    >
                      {formatDate(tx.date)}
                    </td>

                    {/* Judul + deskripsi */}
                    <td className="px-4 py-3.5">
                      <p className="font-medium" style={{ color: "#0A0A0A" }}>
                        {tx.title}
                      </p>
                      {tx.description && (
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "#9C9C9C" }}
                        >
                          {tx.description}
                        </p>
                      )}
                    </td>

                    {/* Kategori — pill chip */}
                    <td className="px-4 py-3.5">
                      <span
                        className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                        style={{ backgroundColor: "#F4F4F5", color: "#6B6B6B" }}
                      >
                        {tx.category}
                      </span>
                    </td>

                    {/* Jenis */}
                    <td className="px-4 py-3.5">
                      <span
                        className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          backgroundColor:
                            tx.type === "income" ? "#D1FAE5" : "#FEE2E2",
                          color: tx.type === "income" ? "#059669" : "#EF4444",
                        }}
                      >
                        {tx.type === "income" ? "Pemasukan" : "Pengeluaran"}
                      </span>
                    </td>

                    {/* Nominal */}
                    <td className="px-4 py-3.5 font-semibold whitespace-nowrap">
                      <span
                        style={{
                          color: tx.type === "income" ? "#059669" : "#EF4444",
                        }}
                      >
                        {tx.type === "income" ? "+" : "-"}
                        {formatRupiah(tx.amount)}
                      </span>
                    </td>

                    {/* Aksi */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        {/* Edit */}
                        <button
                          onClick={() => setEditTarget(tx)}
                          className="flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 hover:-translate-y-px hover:bg-indigo-50"
                          title="Edit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#6366F1"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteTarget(tx)}
                          className="flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 hover:-translate-y-px hover:bg-red-50"
                          title="Hapus"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#EF4444"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      <TransactionModal
        isOpen={addModalOpen}
        mode="add"
        onClose={() => setAddModalOpen(false)}
        onSubmit={onAdd}
      />

      <TransactionModal
        isOpen={editTarget !== null}
        mode="edit"
        initialData={editTarget ?? undefined}
        onClose={() => setEditTarget(null)}
        onSubmit={handleEditSubmit}
      />

      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        transactionTitle={deleteTarget?.title ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </>
  );
}
