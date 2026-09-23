import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background font-body text-content-primary">
      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-surface/80 border-b border-border h-[56px] flex items-center justify-between px-6">
        <div className="font-display font-bold text-[18px] tracking-[-0.03em] text-content-primary">
          Expense Tracker
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-[14px] font-medium text-content-secondary hover:text-content-primary transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-md font-medium px-4 py-[8px] text-[14px] transition-all hover:-translate-y-[1px]"
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[800px] mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="font-display text-[48px] md:text-[60px] font-bold tracking-[-0.04em] leading-tight mb-4">
            Kelola keuangan dengan{" "}
            <span className="text-[#6366F1]">presisi.</span>
          </h1>
          <p className="text-content-secondary text-[18px] max-w-[600px] leading-relaxed">
            Aplikasi pencatatan keuangan pribadi sederhana untuk memantau arus kas,
            ringkasan saldo, dan mutasi pengeluaran Anda.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/register"
              className="bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-md font-medium px-6 py-3 text-[15px] transition-all"
            >
              Mulai Sekarang — Gratis
            </Link>
            <Link
              href="/login"
              className="border border-border text-content-primary hover:bg-surface rounded-md font-medium px-6 py-3 text-[15px] transition-all"
            >
              Masuk ke Akun
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
