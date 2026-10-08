"use client";

import { useTransition } from "react";
import { updateLeadStatus, type LeadCollection } from "@/lib/admin/leadActions";

const STATUSES = ["New", "Contacted", "Qualified", "Follow-Up", "Confirmed", "Closed", "Invalid"];

export function StatusSelect({
  collection,
  id,
  status,
}: {
  collection: LeadCollection;
  id: string;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => startTransition(() => updateLeadStatus(collection, id, e.target.value))}
      className="rounded-md border border-brand-border bg-white px-2 py-1 text-xs font-semibold text-brand-dark disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
