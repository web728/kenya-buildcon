"use client";

import { motion } from "framer-motion";
import type { VisitorGroup } from "@/data/visitorProfile";
import { visitorGroupIconMap } from "@/components/icons/MiscIcons";

interface VisitorGroupCardProps {
  group: VisitorGroup;
  index?: number;
}

export function VisitorGroupCard({ group, index = 0 }: VisitorGroupCardProps) {
  const Icon = visitorGroupIconMap[group.slug];
  const isEven = index % 2 === 0;

  // Dynamic color accents
  const iconAccent = isEven
    ? "bg-brand-red/10 text-brand-red border-brand-red/20"
    : "bg-brand-green/10 text-brand-green-dark border-brand-green/20";

  const glowAccent = isEven ? "from-brand-red/15" : "from-brand-green/15";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-red/10">
        
        {/* Subtle Background Glow Accent */}
        <div
          className={`absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br ${glowAccent} to-transparent opacity-60 blur-xl transition-all duration-300 group-hover:scale-150 group-hover:opacity-100`}
        />

        <div>
          {/* Header Row: Icon + Title */}
          <div className="flex items-start gap-3.5">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border backdrop-blur-md transition-transform duration-300 group-hover:scale-110 ${iconAccent}`}
            >
              {Icon ? (
                <Icon className="h-5 w-5" />
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              )}
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-brand-red">
                {group.name}
              </h3>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Key Decision Makers
              </span>
            </div>
          </div>

          {/* Interactive Role Badges / Chips */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {group.roles.slice(0, 6).map((role) => (
              <span
                key={role}
                className="inline-flex items-center rounded-lg border border-slate-200/60 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors duration-200 group-hover:border-brand-red/20 group-hover:bg-brand-red/5 group-hover:text-slate-900"
              >
                <span className="mr-1.5 h-1 w-1 rounded-full bg-slate-400 group-hover:bg-brand-red" />
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Indicator */}
        <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-brand-red">
          <span>{group.roles.length} Specifier Profiles</span>
          <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}