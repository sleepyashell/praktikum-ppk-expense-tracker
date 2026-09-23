"use client";

import { useState } from "react";
import { signup } from "@/app/actions/auth";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await signup(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // Jika sukses, server action otomatis me-redirect ke /dashboard
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 font-body">
      <div className="w-full max-w-[400px] bg-surface border border-border rounded-xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="font-display text-[32px] font-bold text-content-primary tracking-[-0.03em] mb-2">
            Create an account
          </h1>
          <p className="text-content-secondary text-[15px]">
            Bergabung dan mulai kelola keuangan Anda.
          </p>
        </div>

        <form action={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="p-3 bg-red-50 border border-error rounded-md text-error text-[13px]">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-content-primary">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Jane Doe"
              required
              className={`w-full bg-surface border rounded-md px-[14px] py-[10px] text-[14px] text-content-primary placeholder-content-muted focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/12 transition-all ${
                error
                  ? "border-error focus:border-error focus:ring-error/12"
                  : "border-border"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-content-primary">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              required
              className={`w-full bg-surface border rounded-md px-[14px] py-[10px] text-[14px] text-content-primary placeholder-content-muted focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/12 transition-all ${
                error
                  ? "border-error focus:border-error focus:ring-error/12"
                  : "border-border"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-content-primary">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a secure password"
              required
              minLength={6}
              className={`w-full bg-surface border rounded-md px-[14px] py-[10px] text-[14px] text-content-primary placeholder-content-muted focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/12 transition-all ${
                error
                  ? "border-error focus:border-error focus:ring-error/12"
                  : "border-border"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-primary hover:bg-primary-hover text-white rounded-md font-medium px-4 py-[10px] text-[14px] transition-all hover:-translate-y-[1px] hover:shadow-glow disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-[14px] text-content-secondary">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary-hover font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
