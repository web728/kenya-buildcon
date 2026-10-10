
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import type { ExhibitorSummary } from "@/lib/data/exhibitors";

interface ExhibitorCardProps {
  exhibitor: ExhibitorSummary;
  index?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

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

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 0116 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ExhibitorCard({
  exhibitor,
  index = 0,
}: ExhibitorCardProps) {
  const reduceMotion = useReducedMotion();

  const products = exhibitor.products ?? [];

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 14,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "0px 0px -24px 0px",
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.58,
        delay: reduceMotion
          ? 0
          : Math.min(index, 6) * 0.035,
        ease: EASE,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -3,
              transition: {
                duration: 0.25,
                ease: EASE,
              },
            }
      }
      className="h-full min-w-0"
    >
      <Link
        href={`/exhibitors/${exhibitor.slug}`}
        aria-label={`View exhibitor profile of ${exhibitor.companyName}`}
        className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-[#111111]/10 bg-white p-5 shadow-[0_5px_20px_rgba(17,17,17,0.03)] transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/30 hover:shadow-[0_14px_35px_rgba(17,17,17,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE202B] focus-visible:ring-offset-2 sm:p-6"
      >
        {/* Country and stand */}
        <div className="flex min-h-7 flex-wrap items-center justify-between gap-2">
          {exhibitor.country ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#777777]">
              <LocationIcon />
              {exhibitor.country}
            </span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#888888]">
              Exhibitor Profile
            </span>
          )}

          {exhibitor.standNumber && (
            <span className="rounded-md border border-[#25B34B]/25 bg-[#25B34B]/[0.07] px-2.5 py-1 text-[10px] font-extrabold text-[#1D9440]">
              Stand {exhibitor.standNumber}
            </span>
          )}
        </div>

        {/* Company logo */}
        <div className="mt-4 flex h-[100px] w-full items-center justify-center overflow-hidden rounded-md border border-[#111111]/[0.07] bg-[#FAFAFA] px-5 py-4">
          {exhibitor.logoUrl ? (
            <Image
              src={exhibitor.logoUrl}
              alt={`${exhibitor.companyName} logo`}
              width={210}
              height={75}
              sizes="(max-width: 640px) 180px, 210px"
              className="max-h-[72px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.035]"
            />
          ) : (
            <span className="line-clamp-3 max-w-[250px] text-center text-[15px] font-extrabold leading-[1.4] tracking-[-0.025em] text-[#333333]">
              {exhibitor.companyName}
            </span>
          )}
        </div>

        {/* Company identity */}
        <div className="mt-4 flex-1">
          <h3 className="text-[16px] font-extrabold leading-[1.4] tracking-[-0.025em] text-[#111111] transition-colors duration-300 group-hover:text-[#BE202B] sm:text-[17px]">
            {exhibitor.companyName}
          </h3>

          {exhibitor.category && (
            <p className="mt-2 text-[10px] font-extrabold uppercase leading-[1.6] tracking-[0.09em] text-[#1D9440]">
              {exhibitor.category}
            </p>
          )}

          {products.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {products.slice(0, 3).map((product, i) => (
                <li
                  key={`${product}-${i}`}
                  className="rounded-md border border-[#111111]/[0.06] bg-[#F7F7F7] px-2.5 py-1.5 text-[10px] font-medium leading-[1.45] text-[#666666]"
                >
                  {product}
                </li>
              ))}

              {products.length > 3 && (
                <li className="rounded-md bg-[#F7F7F7] px-2.5 py-1.5 text-[10px] font-bold text-[#888888]">
                  +{products.length - 3} more
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Profile action */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#111111]/10 pt-4">
          <span className="text-[11px] font-extrabold text-[#555555] transition-colors group-hover:text-[#BE202B]">
            View Exhibitor Profile
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F5F5F5] text-[#BE202B] transition-colors duration-300 group-hover:bg-[#BE202B] group-hover:text-white">
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </span>
        </div>

        {/* Brand bottom accent */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 flex h-[2px] w-full"
        >
          <span className="w-0 bg-[#BE202B] transition-[width] duration-500 group-hover:w-[78%]" />
          <span className="w-0 bg-[#25B34B] transition-[width] duration-500 group-hover:w-[22%]" />
        </div>
      </Link>
    </motion.article>
  );
}
