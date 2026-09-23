// tailwind.config.ts (Tambahan konfigurasi)
module.exports = {
  // ... konfigurasi lainnya
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1", // Indigo
          hover: "#4F46E5",
        },
        surface: "#FFFFFF",
        background: "#FAFAFA",
        content: {
          primary: "#0A0A0A",
          secondary: "#6B6B6B",
          muted: "#9C9C9C",
        },
        border: "#E8E8EC",
        error: "#EF4444",
      },
      fontFamily: {
        // Asumsi Anda telah meload font ini di layout.tsx via next/font
        display: ["var(--font-general-sans)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 4px 12px rgba(99, 102, 241, 0.35)",
      },
    },
  },
};
