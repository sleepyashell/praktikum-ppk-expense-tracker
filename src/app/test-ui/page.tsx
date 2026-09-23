"use client";

/**
 * HALAMAN TEST SEMENTARA — HAPUS SEBELUM MERGE KE MAIN
 * Akses: http://localhost:3000/test-ui
 *
 * Tujuan: testing UI komponen TransactionTable, TransactionModal,
 * DeleteConfirmModal dengan mock data — tanpa butuh auth/Supabase.
 */

import { useState } from "react";
import { Transaction } from "@/types";
import TransactionTable from "@/components/TransactionTable";
import { TransactionFormData } from "@/components/TransactionModal";

// ── Mock Data ──────────────────────────────────────────────────────────────────
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    userId: "mock-user-1",
    title: "Gaji Bulan September",
    description: "Transfer dari PT. ABC",
    amount: 5000000,
    type: "income",
    category: "Gaji",
    date: "2026-09-20",
    created_at: "2026-09-20T08:00:00Z",
  },
  {
    id: "2",
    userId: "mock-user-1",
    title: "Bayar Kost",
    description: undefined,
    amount: 1200000,
    type: "expense",
    category: "Tagihan & Utilitas",
    date: "2026-09-18",
    created_at: "2026-09-18T10:00:00Z",
  },
  {
    id: "3",
    userId: "mock-user-1",
    title: "Makan Siang",
    description: "Warteg Bu Yati",
    amount: 25000,
    type: "expense",
    category: "Makan & Minum",
    date: "2026-09-22",
  },
  {
    id: "4",
    userId: "mock-user-1",
    title: "Freelance Design",
    description: "Project logo startup",
    amount: 750000,
    type: "income",
    category: "Freelance",
    date: "2026-09-21",
  },
  {
    id: "5",
    userId: "mock-user-1",
    title: "Grabfood",
    description: undefined,
    amount: 45000,
    type: "expense",
    category: "Makan & Minum",
    date: "2026-09-23",
  },
];

// ── Test Page ──────────────────────────────────────────────────────────────────
export default function TestUIPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) =>
    setLog((prev) => [
      `[${new Date().toLocaleTimeString()}] ${msg}`,
      ...prev.slice(0, 9),
    ]);

  // Mock handlers — simulasi Server Actions
  const handleAdd = async (data: TransactionFormData) => {
    await new Promise((r) => setTimeout(r, 600)); // simulasi delay network
    const newTx: Transaction = {
      id: crypto.randomUUID(),
      userId: "mock-user-1",
      title: data.title,
      description: data.description || undefined,
      amount: Number(data.amount),
      type: data.type,
      category: data.category,
      date: data.date,
      created_at: new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);
    addLog(
      `✅ CREATE: "${data.title}" (${data.type}) — Rp ${Number(data.amount).toLocaleString("id-ID")}`,
    );
  };

  const handleEdit = async (id: string, data: TransactionFormData) => {
    await new Promise((r) => setTimeout(r, 600));
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id
          ? {
              ...tx,
              title: data.title,
              description: data.description || undefined,
              amount: Number(data.amount),
              type: data.type,
              category: data.category,
              date: data.date,
            }
          : tx,
      ),
    );
    addLog(`✏️ UPDATE id=${id.slice(0, 8)}... → "${data.title}"`);
  };

  const handleDelete = async (id: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const tx = transactions.find((t) => t.id === id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    addLog(`🗑️ DELETE: "${tx?.title}"`);
  };

  return (
    <div
      style={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}
      className="p-6"
    >
      {/* Banner */}
      <div
        className="mb-6 rounded-lg px-4 py-3 text-sm font-medium"
        style={{
          backgroundColor: "#FEF3C7",
          color: "#92400E",
          border: "1px solid #FDE68A",
        }}
      >
        ⚠️ <strong>HALAMAN TEST SEMENTARA</strong> — Akses:{" "}
        <code className="font-mono">/test-ui</code>. Hapus folder ini sebelum
        merge ke <code className="font-mono">main</code>.
      </div>

      {/* TransactionTable */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8EC" }}
      >
        <TransactionTable
          transactions={transactions}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Action Log */}
      <div
        className="rounded-xl p-5"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8EC" }}
      >
        <h3 className="text-sm font-semibold mb-3" style={{ color: "#0A0A0A" }}>
          🧪 Action Log (simulasi Server Action)
        </h3>
        {log.length === 0 ? (
          <p className="text-sm" style={{ color: "#9C9C9C" }}>
            Belum ada aksi. Coba tambah, edit, atau hapus transaksi di atas.
          </p>
        ) : (
          <ul className="space-y-1">
            {log.map((entry, i) => (
              <li
                key={i}
                className="text-xs font-mono py-1 px-2 rounded"
                style={{
                  backgroundColor: "#F4F4F5",
                  color: "#0A0A0A",
                  opacity: 1 - i * 0.08,
                }}
              >
                {entry}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
