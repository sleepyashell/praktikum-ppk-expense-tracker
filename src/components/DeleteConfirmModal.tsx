"use client";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  transactionTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  transactionTitle,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onCancel} />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-sm rounded-xl p-6 shadow-lg"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E8E8EC",
        }}
      >
        {/* Icon */}
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: "#FEE2E2" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#EF4444"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="text-center mb-6">
          <h3
            className="text-lg font-semibold mb-1"
            style={{ color: "#0A0A0A", fontFamily: "var(--font-geist-sans)" }}
          >
            Hapus Transaksi
          </h3>
          <p className="text-sm" style={{ color: "#6B6B6B" }}>
            Yakin mau hapus{" "}
            <span className="font-medium" style={{ color: "#0A0A0A" }}>
              &ldquo;{transactionTitle}&rdquo;
            </span>
            ? Tindakan ini tidak bisa dibatalkan.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {/* Cancel */}
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              border: "1px solid #E8E8EC",
              backgroundColor: "transparent",
              color: "#0A0A0A",
            }}
          >
            Batal
          </button>

          {/* Confirm Delete */}
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-md px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#EF4444" }}
          >
            {isLoading ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}
