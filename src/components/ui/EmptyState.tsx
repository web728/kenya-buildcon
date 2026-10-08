import { event } from "@/config/event";

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 text-center shadow-[0_2px_12px_rgb(0,0,0,0.02)]">
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-36 w-72 rounded-full bg-brand-red/[0.06] blur-2xl" />

      {/* Pulse Status Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/[0.06] px-3.5 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">
          Updates Coming Soon
        </span>
      </div>

      <h2 className="mt-4 text-lg sm:text-xl font-bold tracking-tight text-brand-dark">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
        {body}
      </p>

      {/* Organisers Official Backing Bar with All Helplines */}
      <div className="mx-auto mt-8 flex max-w-3xl flex-col lg:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 sm:px-5 text-left">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Direct Organiser Desks
          </span>
          <p className="text-xs font-bold text-brand-dark mt-0.5">
            Futurex Trade Fair &amp; Events &bull; ETSIPL
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
          {event.contactList.map((c) => {
            const isFuturex = c.company === "Futurex Group";
            const firstName = c.name.replace(/^Mr\.\s+/, "").split(" ")[0];

            return (
              <a
                key={c.email}
                href={`tel:${c.phone.replace(/[^0-9+]/g, "")}`}
                className={`inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition-all ${
                  isFuturex
                    ? "hover:border-brand-red/50 hover:text-brand-red"
                    : "hover:border-brand-green/50 hover:text-brand-green"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isFuturex ? "bg-brand-red" : "bg-brand-green"
                  }`}
                />
                <span className="tabular-nums whitespace-nowrap">
                  {firstName}: {c.phone}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}