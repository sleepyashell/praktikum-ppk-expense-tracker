"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Moon,
  Sun,
  Menu,
  X,
  LayoutDashboard,
  Receipt,
  User,
  LogOut,
  ChevronDown,
  Layers,
} from "lucide-react";
import { useTheme } from "@/lib/useTheme";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Transaksi", href: "/transactions", icon: Receipt },
  { label: "Kategori", href: "/categories", icon: Layers },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full h-[56px] border-b border-[#E8E8EC] dark:border-[#26262A] bg-white/85 dark:bg-[#141416]/85 backdrop-blur-md transition-colors">
      <div className="max-w-[1280px] h-full mx-auto px-6 flex items-center justify-between">
        {/* Sisi Kiri: Logo 'Genesis' */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 group text-decoration-none"
          >
            <span className="font-['General_Sans',sans-serif] font-bold text-[20px] tracking-[-0.03em] text-[#0A0A0A] dark:text-[#FAFAFA] transition-colors">
              Genesis
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[11px] font-medium tracking-wide uppercase rounded-[4px] bg-[#E8E8EC]/60 dark:bg-[#26262A] text-[#6B6B6B] dark:text-[#9C9C9C]">
              Expense
            </span>
          </Link>
        </div>

        {/* Bagian Tengah: Tautan Menu (Desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-['DM_Sans',sans-serif] text-[14px] font-medium px-3 py-1.5 rounded-[6px] transition-colors duration-150 ${
                  isActive
                    ? "text-[#0A0A0A] dark:text-[#FAFAFA] bg-black/[0.04] dark:bg-white/[0.08]"
                    : "text-[#6B6B6B] dark:text-[#9C9C9C] hover:text-[#0A0A0A] dark:hover:text-[#FAFAFA] hover:bg-[#FAFAFA] dark:hover:bg-[#1C1C1F]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sisi Kanan: Theme Toggle, User Avatar & Mobile Hamburger */}
        <div className="flex items-center gap-2">
          {/* Tombol Theme Toggle (Dark / Light) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Ubah tema"
            className="w-[32px] h-[32px] rounded-[6px] border border-[#E8E8EC] dark:border-[#26262A] flex items-center justify-center text-[#6B6B6B] dark:text-[#9C9C9C] hover:text-[#0A0A0A] dark:hover:text-[#FAFAFA] hover:bg-[#FAFAFA] dark:hover:bg-[#1C1C1F] transition-all duration-150 active:scale-95"
            title={theme === "dark" ? "Mode Terang" : "Mode Gelap"}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[#F59E0B]" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Desktop User Avatar Dropdown */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsUserDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 p-1 pl-1.5 rounded-[6px] hover:bg-[#FAFAFA] dark:hover:bg-[#1C1C1F] border border-transparent hover:border-[#E8E8EC] dark:hover:border-[#26262A] transition-all"
              aria-expanded={isUserDropdownOpen}
            >
              {/* Avatar circle */}
              <div className="w-7 h-7 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-xs font-semibold shadow-sm">
                AD
              </div>
              <span className="font-['DM_Sans',sans-serif] text-[13px] font-medium text-[#0A0A0A] dark:text-[#FAFAFA]">
                Advan
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#9C9C9C]" />
            </button>

            {/* Dropdown Panel */}
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-[8px] bg-white dark:bg-[#141416] border border-[#E8E8EC] dark:border-[#26262A] shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {/* User Info Header */}
                <div className="px-3.5 py-2 border-b border-[#E8E8EC] dark:border-[#26262A]">
                  <p className="font-['General_Sans',sans-serif] text-[13px] font-semibold text-[#0A0A0A] dark:text-[#FAFAFA] truncate">
                    Advan Workplus
                  </p>
                  <p className="font-['DM_Sans',sans-serif] text-[12px] text-[#6B6B6B] dark:text-[#9C9C9C] truncate">
                    user@expensetracker.local
                  </p>
                </div>

                {/* Menu items */}
                <div className="py-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3.5 py-2 text-[13px] font-['DM_Sans',sans-serif] text-[#0A0A0A] dark:text-[#FAFAFA] hover:bg-[#FAFAFA] dark:hover:bg-[#1C1C1F] transition-colors"
                  >
                    <User className="w-4 h-4 text-[#9C9C9C]" />
                    Profil Pengguna
                  </Link>
                </div>

                <div className="border-t border-[#E8E8EC] dark:border-[#26262A] pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      // Placeholder for logout action
                      alert("Aksi logout dipanggil");
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-[13px] font-['DM_Sans',sans-serif] text-[#EF4444] hover:bg-[#EF4444]/5 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar (Logout)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden w-[32px] h-[32px] rounded-[6px] border border-[#E8E8EC] dark:border-[#26262A] flex items-center justify-center text-[#0A0A0A] dark:text-[#FAFAFA] hover:bg-[#FAFAFA] dark:hover:bg-[#1C1C1F] transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E8EC] dark:border-[#26262A] bg-white dark:bg-[#141416] px-6 py-4 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-1 pb-3 border-b border-[#E8E8EC] dark:border-[#26262A]">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-[14px] font-medium font-['DM_Sans',sans-serif] ${
                    isActive
                      ? "text-[#0A0A0A] dark:text-white bg-black/[0.04] dark:bg-white/[0.08]"
                      : "text-[#6B6B6B] dark:text-[#9C9C9C] hover:bg-[#FAFAFA] dark:hover:bg-[#1C1C1F]"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile User Profile Section */}
          <div className="pt-3 flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-xs font-semibold">
                AD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#0A0A0A] dark:text-[#FAFAFA] truncate">
                  Advan Workplus
                </p>
                <p className="text-[12px] text-[#6B6B6B] dark:text-[#9C9C9C] truncate">
                  user@expensetracker.local
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert("Aksi logout dipanggil")}
              className="flex items-center gap-2 px-3 py-2 text-[13px] font-medium font-['DM_Sans',sans-serif] text-[#EF4444] rounded-[6px] hover:bg-[#EF4444]/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Keluar (Logout)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

