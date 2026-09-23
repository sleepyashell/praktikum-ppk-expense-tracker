// app/actions/auth.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// 1. Fungsi Login
export async function login(formData: FormData) {
  // TAMBAHKAN AWAIT DI SINI:
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

// 2. Fungsi Registrasi
export async function signup(formData: FormData) {
  const supabase = await createClient(); // Ini sudah benar
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

// 3. Fungsi Logout
export async function logout() {
  // TAMBAHKAN AWAIT DI SINI JUGA:
  const supabase = await createClient();

  await supabase.auth.signOut();
  redirect("/login");
}
