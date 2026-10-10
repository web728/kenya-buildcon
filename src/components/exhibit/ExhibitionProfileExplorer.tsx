
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { exhibitionSectors } from "@/data/exhibitionProfile";
import { sectorIconMap } from "@/components/icons/SectorIcons";

/* ==========================================
   MOTION SETTINGS
========================================== */

const EASE = [0.16, 1, 0.3, 1] as const;

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};

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

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function DefaultSectorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-4h4v4" />
    </svg>
  );
}

/* ==========================================
   MAIN EXPLORER
========================================== */

export function ExhibitionProfileExplorer() {
  const reduceMotion = useReducedMotion();

  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState<
    string | null
  >(null);

  const totalProducts = useMemo(
    () =>
      exhibitionSectors.reduce(
        (total, sector) =>
          total + sector.subcategories.length,
        0
      ),
    []
  );

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return exhibitionSectors
      .filter(
        (sector) =>
          !activeSlug || sector.slug === activeSlug
      )
      .map((sector) => {
        if (!search) return sector;

        const sectorMatches = sector.name
          .toLowerCase()
          .includes(search);

        if (sectorMatches) return sector;

        const matchedProducts =
          sector.subcategories.filter((category) =>
            category.toLowerCase().includes(search)
          );

        if (matchedProducts.length === 0) {
          return null;
        }

        return {
          ...sector,
          subcategories: matchedProducts,
        };
      })
      .filter(
        (
          sector
        ): sector is (typeof exhibitionSectors)[number] =>
          sector !== null
      );
  }, [query, activeSlug]);

  const visibleProductCount = filtered.reduce(
    (total, sector) =>
      total + sector.subcategories.length,
    0
  );

  const hasFilters =
    query.trim().length > 0 || activeSlug !== null;

  function resetFilters() {
    setQuery("");
    setActiveSlug(null);
  }

  function selectSector(slug: string | null) {
    setActiveSlug(slug);
    setQuery("");
  }

  return (
    <div className="relative w-full">
      {/* ======================================
          EXPLORER HEADING
      ====================================== */}

      <motion.div
        variants={revealVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-6 flex flex-col gap-4 border-b border-[#111111]/10 pb-6 md:flex-row md:items-end md:justify-between"
      >
        <div className="max-w-[730px]">
          <div className="flex items-center gap-2.5">
            <span className="h-[2px] w-7 bg-[#BE202B]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#BE202B]">
              Kenya Buildcon Product Directory
            </span>
          </div>

          <h2
            id="exhibition-explorer-heading"
            className="mt-3 text-[clamp(1.8rem,3vw,2.7rem)] font-extrabold leading-[1.17] tracking-[-0.04em] text-[#111111]"
          >
            Discover the{" "}
            <span className="text-[#BE202B]">
              Exhibition Sectors.
            </span>
          </h2>

          <p className="mt-3 max-w-[640px] text-[13px] leading-[1.8] text-[#666666] sm:text-[14px]">
            Search construction materials, machinery,
            technology and building systems, or
            explore the exhibition sector by sector.
          </p>
        </div>

        <Link
          href={event.cta.bookStand}
          className="group inline-flex min-h-[43px] shrink-0 items-center justify-center gap-3 self-start rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-[#A51B25]"
        >
          Book Exhibition Space
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </Link>
      </motion.div>

      {/* ======================================
          SEARCH & FILTER PANEL
      ====================================== */}

      <motion.div
        variants={revealVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="overflow-hidden rounded-xl border border-[#111111]/10 bg-white shadow-[0_10px_32px_rgba(17,17,17,0.035)]"
      >
        <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-[590px]">
            <label
              htmlFor="sector-search"
              className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#777777]"
            >
              Search Product Categories
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]">
                <SearchIcon />
              </span>

              <input
                id="sector-search"
                type="search"
                autoComplete="off"
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Try cement, steel, machinery, lighting..."
                className="h-[46px] w-full rounded-md border border-[#111111]/15 bg-[#FAFAFA] pl-11 pr-10 text-[12px] font-medium text-[#111111] outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-[#999999] focus:border-[#BE202B] focus:bg-white focus:ring-[3px] focus:ring-[#BE202B]/10 sm:text-[13px]"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#777777] transition-colors hover:bg-[#EEEEEE] hover:text-[#111111]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          
        </div>

        {/* CATEGORY NAVIGATION */}
        <div className="border-t border-[#111111]/[0.07] bg-[#FAFAFA] px-4 py-4 sm:px-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#777777]">
              Browse by Sector
            </span>

            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] font-bold text-[#BE202B] underline-offset-4 hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          <div
            className="flex gap-2 overflow-x-auto pb-1"
            aria-label="Exhibition sector filters"
          >
            <button
              type="button"
              onClick={() => selectSector(null)}
              aria-pressed={
                activeSlug === null && !query
              }
              className={`shrink-0 rounded-md border px-3.5 py-2.5 text-[11px] font-bold transition-colors duration-200 ${
                activeSlug === null && !query
                  ? "border-[#111111] bg-[#111111] text-white"
                  : "border-[#111111]/10 bg-white text-[#555555] hover:border-[#111111]/30 hover:text-[#111111]"
              }`}
            >
              All Sectors
            </button>

            {exhibitionSectors.map((sector) => {
              const selected =
                activeSlug === sector.slug;

              return (
                <button
                  key={sector.slug}
                  type="button"
                  onClick={() =>
                    selectSector(
                      selected ? null : sector.slug
                    )
                  }
                  aria-pressed={selected}
                  className={`shrink-0 rounded-md border px-3.5 py-2.5 text-[11px] font-semibold transition-colors duration-200 ${
                    selected
                      ? "border-[#BE202B] bg-[#BE202B] text-white"
                      : "border-[#111111]/10 bg-white text-[#555555] hover:border-[#BE202B]/35 hover:text-[#BE202B]"
                  }`}
                >
                  {sector.name}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

    

      {/* ======================================
          ANIMATED SECTOR GRID
      ====================================== */}

      <motion.div
        layout={!reduceMotion}
        className="mt-5 grid grid-cols-1 items-stretch gap-3 md:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence
          mode="popLayout"
          initial={false}
        >
          {filtered.length === 0 ? (
            <motion.div
              key="no-results"
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
                duration: 0.3,
                ease: EASE,
              }}
              className="col-span-full rounded-xl border border-dashed border-[#111111]/20 bg-[#FAFAFA] px-6 py-12 text-center"
            >
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-[#EEEEEE] text-[#777777]">
                <SearchIcon />
              </span>

              <h3 className="mt-4 text-[17px] font-extrabold text-[#111111]">
                No Matching Categories
              </h3>

              <p className="mx-auto mt-2 max-w-[470px] text-[12px] leading-[1.75] text-[#777777]">
                No sectors matched your current
                search or filter. Try a broader
                product name, or return to all
                exhibition sectors.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 inline-flex min-h-[41px] items-center justify-center rounded-md bg-[#BE202B] px-5 py-2.5 text-[11px] font-bold text-white transition-colors hover:bg-[#A51B25]"
              >
                Clear Search & Filters
              </button>
            </motion.div>
          ) : (
            filtered.map((sector, index) => {
              const Icon =
                sectorIconMap[sector.slug];

              return (
                <motion.article
                  layout={!reduceMotion}
                  key={sector.slug}
                  id={sector.slug}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 14,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          y: -8,
                        }
                  }
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.42,
                    delay: reduceMotion
                      ? 0
                      : Math.min(index, 8) * 0.035,
                    ease: EASE,
                    layout: {
                      duration: 0.35,
                      ease: EASE,
                    },
                  }}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#111111]/10 bg-white p-5 shadow-[0_4px_18px_rgba(17,17,17,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/30 hover:shadow-[0_12px_30px_rgba(17,17,17,0.055)] sm:p-6"
                >
                  {/* CARD HEADER */}
                  <div className="flex items-start justify-between gap-4 border-b border-[#111111]/[0.08] pb-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#BE202B]/[0.07] text-[#BE202B] transition-colors duration-300 group-hover:bg-[#BE202B] group-hover:text-white">
                      {Icon ? (
                        <Icon className="h-5 w-5" />
                      ) : (
                        <DefaultSectorIcon />
                      )}
                    </span>

                    <span className="text-[11px] font-extrabold tabular-nums text-[#BBBBBB]">
                      {String(
                        exhibitionSectors.findIndex(
                          (item) =>
                            item.slug === sector.slug
                        ) + 1
                      ).padStart(2, "0")}
                    </span>
                  </div>

                  {/* SECTOR TITLE */}
                  <h3 className="mt-4 text-[17px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#111111] transition-colors group-hover:text-[#BE202B]">
                    {sector.name}
                  </h3>

                  <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.11em] text-[#888888]">
                    {sector.subcategories.length}{" "}
                    Product Categories
                  </p>

                  {/* PRODUCT CATEGORIES */}
                  <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
                    {sector.subcategories.map(
                      (subcategory) => (
                        <li
                          key={subcategory}
                          className="rounded-md border border-[#111111]/[0.07] bg-[#F8F8F8] px-2.5 py-1.5 text-[11px] font-medium leading-[1.5] text-[#555555] transition-colors duration-200 hover:border-[#25B34B]/30 hover:bg-white hover:text-[#111111]"
                        >
                          {subcategory}
                        </li>
                      )
                    )}
                  </ul>

                  {/* CTA */}
                  <div className="mt-6 border-t border-[#111111]/10 pt-4">
                    <Link
                      href={event.cta.bookStand}
                      className="group/link flex min-h-[40px] items-center justify-between gap-3 rounded-md bg-[#111111] px-4 py-2.5 text-[11px] font-extrabold text-white transition-colors duration-300 hover:bg-[#BE202B]"
                      aria-label={`Enquire about exhibiting in ${sector.name}`}
                    >
                      Enquire for Stand Space

                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                        <ArrowIcon />
                      </span>
                    </Link>
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#25B34B] transition-[width] duration-500 group-hover:w-full"
                  />
                </motion.article>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>

      {/* ======================================
          CLOSING EXHIBITOR CTA
      ====================================== */}

      <motion.div
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 18 }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.7,
          ease: EASE,
        }}
        className="relative mt-10 overflow-hidden rounded-xl bg-[#111111] p-6 text-white sm:p-8"
      >
        {/* Decorative construction wireframe */}
        <svg
          aria-hidden="true"
          viewBox="0 0 500 250"
          fill="none"
          className="pointer-events-none absolute bottom-0 right-0 h-full w-auto opacity-40"
        >
          <path
            d="M120 250V80L280 15L440 80V250M175 250V112L280 70L385 112V250"
            stroke="#BE202B"
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          <path
            d="M230 250V160H330V250M120 140H440"
            stroke="#25B34B"
            strokeWidth="1"
            strokeOpacity="0.35"
          />
        </svg>

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[720px]">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#F26B70]">
              Exhibit at Kenya Buildcon 2027
            </span>

            <h2 className="mt-3 text-[clamp(1.65rem,2.65vw,2.4rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-white">
              Showcase Your Products.{" "}
              <span className="text-white/75">
                Meet the Industry.
              </span>
            </h2>

            <p className="mt-3 max-w-[620px] text-[12px] leading-[1.8] text-white/70 sm:text-[13px]">
              Present your building materials,
              machinery, equipment and
              construction technologies at{" "}
              {event.name} in{" "}
              {event.venue.city}.
            </p>

            <p className="mt-3 text-[11px] font-medium text-white/50">
              {event.dates.display} ·{" "}
              {event.venue.name}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[44px] items-center justify-center gap-3 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#A51B25]"
            >
              Book a Stand
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>

            <Link
              href="/who-should-exhibit"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/25 px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#111111]"
            >
              Who Should Exhibit
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
