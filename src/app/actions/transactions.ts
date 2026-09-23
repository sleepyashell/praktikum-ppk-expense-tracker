"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Transaction, TransactionType } from "@/types";
import { TransactionFormData } from "@/components/TransactionModal";

/**
 * 1. Ambil semua transaksi milik user yang sedang aktif (FR-3.2, NFR-1.2)
 * Data terisolasi otomatis berdasarkan user.id dari session Supabase Auth.
 */
export async function getTransactions(
  filter?: "all" | "income" | "expense",
): Promise<Transaction[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  let query = supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (filter && filter !== "all") {
    query = query.eq("type", filter);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Gagal mengambil data transaksi:", error.message);
    throw new Error(error.message);
  }

  return (data || []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    amount: Number(row.amount),
    type: row.type as TransactionType,
    category: row.category,
    date: row.date,
    created_at: row.created_at,
  }));
}

/**
 * 2. Tambah transaksi baru (FR-3.1, NFR-1.1)
 * Wajib mengikat user_id dari sesi login pengguna aktif.
 */
export async function createTransaction(formData: TransactionFormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Sesi tidak valid. Silakan login kembali.");
  }

  const amount = Number(formData.amount);
  if (isNaN(amount) || amount <= 0) {
    throw new Error("Nominal transaksi harus berupa angka positif.");
  }

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    title: formData.title.trim(),
    amount: amount,
    type: formData.type,
    category: formData.category,
    date: formData.date,
  });

  if (error) {
    console.error("Gagal menambahkan transaksi:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/transactions");
}

/**
 * 3. Update transaksi (FR-3.3, NFR-1.2)
 * Wajib memastikan id transaksi dan user_id cocok.
 */
export async function updateTransaction(
  id: string,
  formData: TransactionFormData,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Sesi tidak valid. Silakan login kembali.");
  }

  const amount = Number(formData.amount);
  if (isNaN(amount) || amount <= 0) {
    throw new Error("Nominal transaksi harus berupa angka positif.");
  }

  const { error } = await supabase
    .from("transactions")
    .update({
      title: formData.title.trim(),
      amount: amount,
      type: formData.type,
      category: formData.category,
      date: formData.date,
    })
    .eq("id", id)
    .eq("user_id", user.id); // Isolasi Data (NFR-1.2)

  if (error) {
    console.error("Gagal mengupdate transaksi:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/transactions");
}

/**
 * 4. Hapus transaksi (FR-3.4, NFR-1.2)
 * Wajib memastikan transaksi yang dihapus milik pengguna aktif.
 */
export async function deleteTransaction(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Sesi tidak valid. Silakan login kembali.");
  }

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // Isolasi Data (NFR-1.2)

  if (error) {
    console.error("Gagal menghapus transaksi:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/transactions");
}
