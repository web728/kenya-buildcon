import Image from "next/image";
import type { PartnerSummary } from "@/lib/data/partners";

export function PartnerLogo({ partner }: { partner: PartnerSummary }) {
  const content = (
    <div className="group relative flex h-20 sm:h-24 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-[0_2px_8px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/50 hover:shadow-lg hover:shadow-brand-red/5">
      
      {/* Background Soft Hover Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-red/[0.04] via-transparent to-brand-green/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* External Link Arrow Indicator */}
      {partner.url && (
        <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-slate-400 opacity-0 transition-all duration-200 group-hover:bg-brand-red group-hover:text-white group-hover:opacity-100">
          <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </span>
      )}

      {/* Logo or Stylized Name Pill */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-2 text-center">
        {partner.logoUrl ? (
          <Image
            src={partner.logoUrl}
            alt={partner.name}
            width={160}
            height={60}
            className="max-h-10 sm:max-h-12 w-auto max-w-[90%] object-contain opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : (
          <span className="text-[11px] font-bold tracking-tight text-slate-700 transition-colors group-hover:text-brand-red line-clamp-2">
            {partner.name}
          </span>
        )}
      </div>

      {/* Micro Tooltip */}
      <div className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-brand-dark px-2 py-0.5 text-[9px] font-semibold text-white opacity-0 shadow-md transition-all duration-200 group-hover:-bottom-8 group-hover:opacity-100 z-20">
        {partner.name}
      </div>
    </div>
  );

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={partner.name}
        className="block focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 rounded-2xl"
      >
        {content}
      </a>
    );
  }

  return content;
}