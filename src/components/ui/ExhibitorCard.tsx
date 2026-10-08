"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ExhibitorSummary } from "@/lib/data/exhibitors";

interface ExhibitorCardProps {
  exhibitor: ExhibitorSummary;
  index?: number;
}

export function ExhibitorCard({ exhibitor, index = 0 }: ExhibitorCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link
        href={`/exhibitors/${exhibitor.slug}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-red/50 hover:shadow-xl hover:shadow-brand-red/10"
      >
        {/* Subtle Gradient Glow */}
        <div
          className={`absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br ${
            isEven ? "from-brand-red/15" : "from-brand-green/15"
          } to-transparent opacity-60 blur-xl transition-all duration-300 group-hover:scale-150 group-hover:opacity-100`}
        />

        <div>
          {/* Top Bar: Country & Stand Badge */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
              <svg className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {exhibitor.country}
            </span>

            {exhibitor.standNumber && (
              <span className="rounded-md border border-brand-green/30 bg-brand-green/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-green-dark">
                Stand {exhibitor.standNumber}
              </span>
            )}
          </div>

          {/* Logo Frame */}
          <div className="mt-5 flex h-20 w-full items-center justify-center rounded-xl border border-slate-100 bg-slate-50/80 p-3 transition-colors duration-200 group-hover:border-brand-red/20 group-hover:bg-white">
            {exhibitor.logoUrl ? (
              <Image
                src={exhibitor.logoUrl}
                alt={exhibitor.companyName}
                width={160}
                height={64}
                className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-100 px-3 text-center text-sm font-bold text-slate-700">
                {exhibitor.companyName}
              </div>
            )}
          </div>

          {/* Company Name */}
          <h3 className="mt-4 text-base sm:text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-brand-red">
            {exhibitor.companyName}
          </h3>

          {/* Category Badge */}
          {exhibitor.category && (
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-brand-green-dark">
              {exhibitor.category}
            </p>
          )}
        </div>

        {/* Footer Link Indicator */}
        <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-brand-red">
          <span>View Exhibitor Profile</span>
          <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}