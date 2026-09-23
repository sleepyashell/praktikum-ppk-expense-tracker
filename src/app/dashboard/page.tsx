import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
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

        <p className="text-content-secondary text-[15px]">
          Selamat datang,{" "}
          <strong className="text-content-primary">
            {user.user_metadata?.full_name || user.email}
          </strong>
          !
        </p>
      </div>
    </div>
  );
}
