"use client";

import { useTransition } from "react";
import { clsx } from "@/lib/utils/clsx";

export function PublishToggle({
  published,
  onToggle,
}: {
  published: boolean;
  onToggle: (next: boolean) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => onToggle(!published))}
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-semibold disabled:opacity-50",
        published ? "bg-brand-green/10 text-brand-green" : "bg-brand-border text-brand-body",
      )}
    >
      {published ? "Published" : "Draft"}
    </button>
  );
}
