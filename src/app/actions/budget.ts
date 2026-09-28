"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

function getCurrentMonth() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(new Date());
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;

  return `${year}-${month}-01`;
}

export async function getMonthlyBudget(): Promise<number | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("monthly_budgets")
    .select("amount")
    .eq("user_id", user.id)
    .eq("month", getCurrentMonth())
    .maybeSingle();

  if (error) {
    console.error("Gagal mengambil anggaran bulanan:", error.message);
    throw new Error(error.message);
  }

  return data ? Number(data.amount) : null;
}

export async function saveMonthlyBudget(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Sesi tidak valid. Silakan login kembali.",
      success: false,
    };
  }

  const rawAmount = formData.get("amount");
  const amount = typeof rawAmount === "string" ? Number(rawAmount) : NaN;

  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: "Masukkan anggaran lebih besar dari Rp0.", success: false };
  }

  const { error } = await supabase.from("monthly_budgets").upsert(
    {
      user_id: user.id,
      month: getCurrentMonth(),
      amount,
    },
    { onConflict: "user_id,month" },
  );

  if (error) {
    console.error("Gagal menyimpan anggaran bulanan:", error.message);
    return {
      error: "Anggaran belum berhasil disimpan. Coba lagi.",
      success: false,
    };
  }

  revalidatePath("/dashboard");
  return { error: null, success: true };
}
