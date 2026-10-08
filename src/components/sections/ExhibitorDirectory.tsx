"use client";

import { useMemo, useState } from "react";
import { ExhibitorCard } from "@/components/ui/ExhibitorCard";
import type { ExhibitorSummary } from "@/lib/data/exhibitors";

export function ExhibitorDirectory({ exhibitors }: { exhibitors: ExhibitorSummary[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return exhibitors;
    return exhibitors.filter((e) =>
      [e.companyName, e.country, e.category, ...(e.products ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [exhibitors, query]);

  return (
    <div>
      <label htmlFor="exhibitor-search" className="sr-only">
        Search exhibitors by company, product or country
      </label>
      <input
        id="exhibitor-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by company, product or country…"
        className="w-full max-w-lg rounded-md border border-brand-border bg-white px-4 py-3 text-sm focus:border-brand-red focus:outline-none"
      />

      <p className="mt-4 text-sm text-brand-body">
        {filtered.length} {filtered.length === 1 ? "exhibitor" : "exhibitors"}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((exhibitor) => (
          <ExhibitorCard key={exhibitor._id} exhibitor={exhibitor} />
        ))}
      </div>
    </div>
  );
}
