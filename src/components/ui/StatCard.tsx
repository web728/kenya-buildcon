import type { MarketFact } from "@/data/marketFacts";

export function StatCard({ fact }: { fact: MarketFact }) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_2px_12px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-red/5">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="rounded-full border border-slate-200/80 bg-slate-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-red">
            {fact.period || "Official Indicator"}
          </span>

          <svg
            className="h-4 w-4 text-slate-300 transition-colors group-hover:text-brand-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>

        <p className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-brand-dark tabular-nums">
          {fact.value}
        </p>

        <h3 className="mt-1 text-xs sm:text-sm font-bold tracking-tight text-brand-dark group-hover:text-brand-red transition-colors">
          {fact.label}
        </h3>

        {fact.detail && (
          <p className="mt-2 text-[11px] sm:text-xs leading-[1.6] text-slate-500 font-normal">
            {fact.detail}
          </p>
        )}
      </div>

      <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
        <span className="truncate pr-2 font-medium">
          {fact.sourceUrl ? (
            <a
              href={fact.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand-red hover:underline"
            >
              {fact.sourceName}
            </a>
          ) : (
            fact.sourceName
          )}
        </span>
        <span className="font-semibold text-slate-400">Verified</span>
      </div>
    </div>
  );
}