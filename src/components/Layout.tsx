import React from "react";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  /**
   * Optional custom container max-width or styling.
   * Default adheres to Genesis 1280px with 24px padding.
   */
  className?: string;
  /**
   * Set to true if the page needs full-width canvas (e.g. landing heroes)
   */
  fullWidth?: boolean;
}

export default function Layout({
  children,
  className = "",
  fullWidth = false,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#EDEDED] transition-colors duration-200">
      {/* Sticky Genesis Navbar */}
      <Navbar />

      {/* Main Content Area adhering to Genesis 4px grid & 1280px container */}
      <main
        className={`flex-1 w-full ${
          fullWidth
            ? "w-full"
            : "max-w-[1280px] mx-auto px-6 py-8"
        } ${className}`}
      >
        {children}
      </main>

      {/* Subtle Footer conforming to Genesis minimal border elevation */}
      <footer className="w-full border-t border-[#E8E8EC] dark:border-[#26262A] py-6 bg-white dark:bg-[#141416] transition-colors">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] font-['DM_Sans',sans-serif] text-[#6B6B6B] dark:text-[#9C9C9C]">
          <div className="flex items-center gap-2">
            <span className="font-['General_Sans',sans-serif] font-bold text-[#0A0A0A] dark:text-[#FAFAFA]">
              Genesis
            </span>
            <span>— Expense Tracker PPK</span>
          </div>
          <p className="text-[12px] text-[#9C9C9C]">
            Isolasi Sesi &amp; Cookie Preferences Aktif
          </p>
        </div>
      </footer>
    </div>
  );
}

