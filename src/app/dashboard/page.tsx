import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "@/app/actions/auth";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background font-body p-8">
      <div className="max-w-[1000px] mx-auto bg-surface border border-border rounded-xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
          <h1 className="font-display text-[24px] font-bold tracking-[-0.03em] text-content-primary">
            Dashboard Keuangan
          </h1>

          <form action={logout}>
            <button
              type="submit"
              className="bg-transparent border border-border text-content-primary hover:-translate-y-[1px] rounded-md font-medium px-4 py-[8px] text-[14px] transition-all"
            >
              Log out
            </button>
          </form>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-6 border-t border-border">
          <p className="text-content-secondary text-[15px]">
            Selamat datang,{" "}
            <strong className="text-content-primary">
              {user.user_metadata?.full_name || user.email}
            </strong>
            !
          </p>

          <Link
            href="/dashboard/transactions"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md font-medium text-sm transition-all shadow-glow hover:-translate-y-[1px]"
          >
            <span>Kelola Transaksi</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
