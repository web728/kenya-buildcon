"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route Level Error:", error);
  }, [error]);

  const cleanPhone = event.contact.general.phone.replace(/[^0-9+]/g, "");

  return (
    <div className="relative flex min-h-[100vh] items-center justify-center overflow-hidden bg-[#030712] px-4 py-20 text-white selection:bg-brand-red selection:text-white">
      {/* Dynamic Background Architectural Mesh & Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-rose-500/10 blur-[160px]" />
        <div className="absolute top-1/3 right-1/4 h-[350px] w-[350px] rounded-full bg-brand-red/15 blur-[150px]" />

        {/* Blueprint Fine Grid Pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <Container className="relative z-10 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          {/* Top Gradient Highlight Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-80" />

          {/* Minimal Status Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-rose-300">
              System Interruption
            </span>
          </div>

          {/* Title */}
          <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
            Something Went{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-white to-brand-red">
              Unexpectedly Wrong
            </span>
          </h2>

          {/* Description */}
          <p className="mt-2.5 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            An internal runtime error occurred while processing this section. Try re-attempting the operation or navigate back to the main portal.
          </p>

          {/* Trace Reference Pill */}
          {error.digest && (
            <div className="mt-4">
              <span className="inline-flex items-center font-mono text-[10px] text-slate-400 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-md">
                Ref ID: {error.digest}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(200,38,45,0.35)] transition-all duration-300 hover:bg-brand-red-dark hover:shadow-[0_0_26px_rgba(200,38,45,0.5)] active:scale-95 cursor-pointer"
            >
              Try Again
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-200 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/[0.1] active:scale-95"
            >
              Return Home
            </Link>
          </div>

       {/* Direct Organizer Support Desk */}
<div className="mt-9 pt-6 border-t border-white/10">
  <p className="text-[11px] text-slate-400">{event.name} Secretariat</p>

  <div className="mt-3 flex flex-col gap-3">
    {event.contactList.map((c) => (
      <div
        key={c.email}
        className="flex flex-col gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs"
      >
        <p className="font-semibold text-white">{c.name}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-300">
          <a
            href={`tel:${c.phone.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-1.5 font-medium tabular-nums transition-colors hover:text-brand-green"
          >
            <svg className="h-3.5 w-3.5 text-brand-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {c.phone}
          </a>
          <a
            href={`mailto:${c.email}`}
            className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-brand-red truncate"
          >
            <svg className="h-3.5 w-3.5 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{c.email}</span>
          </a>
        </div>
      </div>
    ))}
  </div>
</div>
        </motion.div>
      </Container>
    </div>
  );
}