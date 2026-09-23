import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/context/ThemeContext";
import Layout from "@/components/Layout";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genesis — Expense Tracker",
  description: "Aplikasi pencatatan keuangan pribadi sederhana - Praktikum PPK",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const initialTheme = themeCookie === "dark" ? "dark" : "light";

  return (
    <html
      lang="id"
      className={`${initialTheme === "dark" ? "dark" : ""} ${dmSans.variable} ${jetbrainsMono.variable} h-full`}
      data-theme={initialTheme}
      suppressHydrationWarning
    >
      <body className="min-h-full font-['DM_Sans',sans-serif] antialiased selection:bg-[#6366F1]/20 selection:text-[#6366F1]">
        <ThemeProvider initialTheme={initialTheme}>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
