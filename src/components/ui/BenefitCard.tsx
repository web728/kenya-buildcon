"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { benefitIconMap } from "@/components/icons/MiscIcons";

interface BenefitCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  light?: boolean;
  index?: number;
  badge?: string;
  /** Optional call-to-action rendered as a real link in the card footer. */
  cta?: { label: string; href: string };
}

export function BenefitCard({
  title,
  description,
  icon,
  light = false,
  index = 0,
  badge = "Advantage",
  cta,
}: BenefitCardProps) {
  const FallbackIcon = benefitIconMap[title];
  const isBlue = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <div
        className={`group relative flex h-full flex-col justify-between rounded-2xl border p-6 sm:p-7 transition-all duration-300 ${
          light
            ? "border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-brand-red/50 hover:bg-white/[0.06] hover:shadow-2xl"
            : "border-slate-200/80 bg-white/95 backdrop-blur-md hover:border-brand-red/40 hover:bg-white hover:shadow-xl hover:shadow-brand-red/5"
        }`}
      >
        <div>
          {/* Header Row: Line Icon + Mini Badge */}
          <div
            className={`flex items-center justify-between pb-4 border-b ${
              light ? "border-white/[0.08]" : "border-slate-100"
            }`}
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                light
                  ? isBlue
                    ? "bg-brand-red/15 text-brand-red group-hover:bg-brand-red group-hover:text-white"
                    : "bg-brand-green/15 text-brand-green group-hover:bg-brand-green group-hover:text-white"
                  : isBlue
                  ? "bg-brand-red/[0.08] text-brand-red group-hover:bg-brand-red group-hover:text-white"
                  : "bg-brand-green/[0.08] text-brand-green group-hover:bg-brand-green group-hover:text-white"
              }`}
            >
              {icon ? (
                icon
              ) : FallbackIcon ? (
                <FallbackIcon aria-hidden="true" className="h-5 w-5" />
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
            </div>

            <span
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
                light
                  ? "border border-white/10 bg-white/[0.04] text-slate-300"
                  : "border border-slate-200/80 bg-slate-50 text-slate-500"
              }`}
            >
              {badge}
            </span>
          </div>

          {/* Title with generous spacing */}
          <h3
            className={`mt-5 text-base sm:text-lg font-bold tracking-tight leading-[1.35] transition-colors ${
              light
                ? "text-white group-hover:text-brand-red"
                : "text-brand-dark group-hover:text-brand-red"
            }`}
          >
            {title}
          </h3>

          {/* Description: non-chipku relaxed flow */}
          {description && (
            <p
              className={`mt-3 text-[13px] sm:text-[13.5px] leading-[1.75] tracking-normal font-normal ${
                light ? "text-slate-300/90" : "text-slate-600"
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {cta ? (
          <Link
            href={cta.href}
            className={`mt-6 pt-3.5 border-t flex items-center justify-between text-xs font-semibold hover:underline ${
              light ? "border-white/[0.08] text-brand-red-light" : "border-slate-100 text-brand-red"
            }`}
          >
            <span className="tracking-wide">{cta.label}</span>
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        ) : null}
      </div>
    </motion.div>
  );
}