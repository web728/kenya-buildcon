"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { sectorIconMap } from "@/components/icons/SectorIcons";

interface SectorCardProps {
  name: string;
  slug: string;
  index: number;
}

export function SectorCard({ name, slug, index }: SectorCardProps) {
  const Icon = sectorIconMap[slug];
  
  // Dynamic alternating accent styling (Red / Green theme)
  const isEven = index % 2 === 0;
  const iconAccent = isEven 
    ? "bg-brand-red/10 text-brand-red border-brand-red/20" 
    : "bg-brand-green/10 text-brand-green-dark border-brand-green/20";
    
  const glowAccent = isEven ? "from-brand-red/15" : "from-brand-green/15";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link
        href={`/exhibition-profile#${slug}`}
        className="group relative flex h-full min-h-[160px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:border-brand-red/50 hover:shadow-xl hover:shadow-brand-red/10"
      >
        {/* Subtle Gradient Glow Corner Effect */}
        <div 
          className={`absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${glowAccent} to-transparent opacity-60 blur-xl transition-all duration-300 group-hover:scale-150 group-hover:opacity-100`}
        />

        <div>
          {/* Top Row: Icon + Arrow Indicator */}
          <div className="flex items-center justify-between">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-md transition-transform duration-300 group-hover:scale-110 ${iconAccent}`}>
              {Icon ? (
                <Icon className="h-5 w-5" />
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                </svg>
              )}
            </div>

            {/* Hover Arrow Badge */}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all duration-300 group-hover:bg-brand-red group-hover:text-white group-hover:translate-x-0.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>

          {/* Sector Title */}
          <h3 className="mt-4 text-sm sm:text-base font-bold leading-snug text-slate-800 transition-colors duration-200 group-hover:text-brand-red">
            {name}
          </h3>
        </div>

        {/* Bottom CTA Label */}
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400 group-hover:text-brand-red">
          <span>Explore Products</span>
          <span className="h-1 w-1 rounded-full bg-slate-300 group-hover:bg-brand-red" />
        </div>
      </Link>
    </motion.div>
  );
}