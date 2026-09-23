import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "@/app/actions/transactions";
import TransactionTable from "@/components/TransactionTable";
import { ArrowLeft } from "lucide-react";

export default async function TransactionsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const transactions = await getTransactions();

  return (
    <div className="min-h-screen bg-background font-body p-6 sm:p-8">
      <div className="max-w-[1000px] mx-auto space-y-6">
        {/* Navigation Breadcrumb / Back */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-content-secondary hover:text-content-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </Link>

          <span className="text-xs text-content-muted">
            Login sebagai:{" "}
            <strong className="text-content-secondary font-medium">
              {user.user_metadata?.full_name || user.email}
            </strong>
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-surface border border-border rounded-xl p-6 sm:p-8 shadow-sm">
          <TransactionTable
            transactions={transactions}
            onAdd={createTransaction}
            onEdit={updateTransaction}
            onDelete={deleteTransaction}
          />
        </div>
      </div>
    </div>
  );
}
