"use client";

import { useTransition } from "react";

export function DeleteButton({ onDelete, label = "Delete" }: { onDelete: () => Promise<void>; label?: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm("Are you sure you want to delete this item?")) {
          startTransition(onDelete);
        }
      }}
      className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-50"
    >
      {label}
    </button>
  );
}
