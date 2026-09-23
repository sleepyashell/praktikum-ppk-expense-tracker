import Dashboard from "@/components/Dashboard";

export default function Home() {
  // Nantinya data ini dapat diambil langsung dari Supabase di Server Component ini
  // dan diteruskan sebagai props ke <Dashboard />.
  return <Dashboard />;
}
