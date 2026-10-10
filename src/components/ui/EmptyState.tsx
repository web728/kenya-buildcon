
import Link from "next/link";

import { event } from "@/config/event";

interface EmptyStateProps {
  title: string;
  body: string;
}

export function EmptyState({
  title,
  body,
}: EmptyStateProps) {
  return (
    <div className="relative isolate overflow-hidden rounded-xl border border-[#111111]/10 bg-white px-5 py-9 text-center shadow-[0_8px_30px_rgba(17,17,17,0.035)] sm:px-8 sm:py-11">
      {/* Decorative architectural outline */}
      <svg
        aria-hidden="true"
        viewBox="0 0 520 230"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-auto max-w-full opacity-40"
      >
        <path
          d="M80 230V100L240 35L400 100V230M135 230V130L240 85L345 130V230"
          stroke="#BE202B"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
        <path
          d="M190 230V155H290V230M80 155H400"
          stroke="#25B34B"
          strokeOpacity="0.16"
          strokeWidth="1"
        />
      </svg>

      {/* Status */}
      <div className="inline-flex items-center gap-2.5 rounded-md border border-[#111111]/10 bg-[#FAFAFA] px-3.5 py-2">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-[#25B34B]"
        />

        <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#555555]">
          Directory Updates Pending
        </span>
      </div>

      <h3 className="mt-5 text-[clamp(1.35rem,2.2vw,1.85rem)] font-extrabold tracking-[-0.035em] text-[#111111]">
        {title}
      </h3>

      <p className="mx-auto mt-3 max-w-[550px] text-[12px] leading-[1.85] text-[#666666] sm:text-[13px]">
        {body}
      </p>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={event.cta.bookStand}
          className="inline-flex min-h-[42px] items-center justify-center rounded-md bg-[#BE202B] px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#A51B25]"
        >
          Enquire About Exhibiting
        </Link>

        <Link
          href="/contact"
          className="inline-flex min-h-[42px] items-center justify-center rounded-md border border-[#111111]/20 bg-white px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.05em] text-[#111111] transition-colors hover:border-[#111111]"
        >
          Contact Organisers
        </Link>
      </div>

      {/* Official desk contacts */}
      <div className="mx-auto mt-8 max-w-[760px] border-t border-[#111111]/10 pt-5">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#888888]">
          Official Organising Team
        </span>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {event.contactList.map((contact) => (
            <a
              key={contact.email}
              href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex min-h-[38px] items-center gap-2 rounded-md border border-[#111111]/10 bg-[#FAFAFA] px-3 py-2 text-[11px] font-semibold text-[#444444] transition-colors hover:border-[#25B34B]/40 hover:text-[#1D9440]"
              aria-label={`Call ${contact.name} at ${contact.phone}`}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#25B34B]"
              />
              <span>{contact.name}</span>
              <span className="text-[#999999]">·</span>
              <span className="tabular-nums">
                {contact.phone}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
