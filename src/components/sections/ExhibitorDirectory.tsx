
"use client";

import { useMemo, useState } from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { ExhibitorCard } from "@/components/ui/ExhibitorCard";
import type { ExhibitorSummary } from "@/lib/data/exhibitors";

const EASE = [0.16, 1, 0.3, 1] as const;

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7.5" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

export function ExhibitorDirectory({
  exhibitors,
}: {
  exhibitors: ExhibitorSummary[];
}) {
  const reduceMotion = useReducedMotion();

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return exhibitors;

    return exhibitors.filter((exhibitor) =>
      [
        exhibitor.companyName,
        exhibitor.country,
        exhibitor.category,
        ...(exhibitor.products ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }, [exhibitors, query]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="w-full">
      {/* Search control */}
      <div className="rounded-xl border border-[#111111]/10 bg-white p-4 shadow-[0_8px_30px_rgba(17,17,17,0.035)] sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="w-full md:max-w-[640px]">
            <label
              htmlFor="exhibitor-search"
              className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#777777]"
            >
              Search Published Exhibitors
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]">
                <SearchIcon />
              </span>

              <input
                id="exhibitor-search"
                type="search"
                autoComplete="off"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search company, country, products..."
                className="h-[46px] w-full rounded-md border border-[#111111]/15 bg-[#FAFAFA] pl-11 pr-10 text-[12px] font-medium text-[#111111] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#999999] focus:border-[#BE202B] focus:ring-[3px] focus:ring-[#BE202B]/10 sm:text-[13px]"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear exhibitor search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#777777] transition-colors hover:bg-[#EEEEEE] hover:text-[#111111]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Directory status */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="border-l-[2px] border-[#BE202B] pl-3">
              <span className="block text-[21px] font-black tabular-nums tracking-[-0.04em] text-[#111111]">
                {exhibitors.length}
              </span>

              <span className="block text-[10px] font-semibold text-[#777777]">
                Published Profiles
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Result count */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#111111]/10 pb-4"
      >
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#25B34B]" />

          <p className="text-[12px] font-semibold text-[#555555]">
            <strong className="text-[#111111]">
              {filtered.length}
            </strong>{" "}
            {filtered.length === 1
              ? "exhibitor"
              : "exhibitors"}{" "}
            found
          </p>
        </div>

        <span className="text-[10px] font-medium text-[#888888]">
          {hasQuery
            ? "Search Results"
            : "Published Exhibitor Directory"}
        </span>
      </div>

      {/* Animated cards */}
      <motion.div
        layout={!reduceMotion}
        className="mt-5 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty-search"
              layout={!reduceMotion}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, y: -8 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                ease: EASE,
              }}
              className="col-span-full rounded-xl border border-dashed border-[#111111]/20 bg-[#FAFAFA] px-6 py-12 text-center"
            >
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-[#EEEEEE] text-[#777777]">
                <SearchIcon />
              </span>

              <h3 className="mt-4 text-[17px] font-extrabold text-[#111111]">
                No Matching Exhibitors
              </h3>

              <p className="mx-auto mt-2 max-w-[440px] text-[12px] leading-[1.75] text-[#777777]">
                No published exhibitor profiles match
                your search. Try a different company,
                country, category or product.
              </p>

              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-5 inline-flex min-h-[40px] items-center justify-center rounded-md bg-[#BE202B] px-5 py-2.5 text-[11px] font-bold text-white transition-colors hover:bg-[#A51B25]"
              >
                Clear Search
              </button>
            </motion.div>
          ) : (
            filtered.map((exhibitor, index) => (
              <motion.div
                key={String(exhibitor._id)}
                layout={!reduceMotion}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 12,
                      }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: -8,
                      }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.38,
                  delay: reduceMotion
                    ? 0
                    : Math.min(index, 8) * 0.025,
                  ease: EASE,
                  layout: {
                    duration: 0.3,
                    ease: EASE,
                  },
                }}
                className="h-full min-w-0"
              >
                <ExhibitorCard exhibitor={exhibitor} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
