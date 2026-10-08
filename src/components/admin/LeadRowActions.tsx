"use client";

import { useRef, useState, useTransition } from "react";
import { addLeadNote, retrySheetsSync, type LeadCollection } from "@/lib/admin/leadActions";
import { clsx } from "@/lib/utils/clsx";

export function LeadRowActions({
  collection,
  id,
  notes,
  sheetsSyncStatus,
  emailStatus,
}: {
  collection: LeadCollection;
  id: string;
  notes: { text: string; createdAt: string }[];
  sheetsSyncStatus: string;
  emailStatus: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div>
      <div className="flex items-center gap-3 text-xs">
        <span
          className={clsx(
            "rounded-full px-2 py-0.5 font-semibold",
            sheetsSyncStatus === "synced" && "bg-brand-green/10 text-brand-green",
            sheetsSyncStatus === "failed" && "bg-red-100 text-red-700",
            sheetsSyncStatus === "pending" && "bg-brand-border text-brand-body",
          )}
        >
          Sheets: {sheetsSyncStatus}
        </span>
        <span
          className={clsx(
            "rounded-full px-2 py-0.5 font-semibold",
            emailStatus === "sent" && "bg-brand-green/10 text-brand-green",
            emailStatus === "failed" && "bg-red-100 text-red-700",
            emailStatus === "pending" && "bg-brand-border text-brand-body",
          )}
        >
          Email: {emailStatus}
        </span>
        {sheetsSyncStatus === "failed" ? (
          <button
            type="button"
            disabled={isPending}
            onClick={() => startTransition(() => retrySheetsSync(collection, id))}
            className="font-semibold text-brand-red hover:underline disabled:opacity-50"
          >
            Retry sync
          </button>
        ) : null}
        <button type="button" onClick={() => setOpen((v) => !v)} className="font-semibold text-brand-red hover:underline">
          Notes ({notes.length})
        </button>
      </div>

      {open ? (
        <div className="mt-2 rounded-md border border-brand-border bg-brand-light p-3">
          <ul className="flex flex-col gap-1">
            {notes.map((n, i) => (
              <li key={i} className="text-xs text-brand-body">
                <span className="text-brand-dark">{n.text}</span>{" "}
                <span className="text-brand-body/60">— {new Date(n.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <form
            ref={formRef}
            action={(formData) => {
              const text = String(formData.get("note") ?? "");
              startTransition(async () => {
                await addLeadNote(collection, id, text);
                formRef.current?.reset();
              });
            }}
            className="mt-2 flex gap-2"
          >
            <input
              name="note"
              placeholder="Add an internal note…"
              className="flex-1 rounded-md border border-brand-border px-2 py-1.5 text-xs"
            />
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-brand-red px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
            >
              Add
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
