"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

export function SuccessPanel({
  title,
  message,
  referenceId,
  homeLabel = "Back to Home",
  nextStep,
}: {
  title: string;
  message: string;
  referenceId?: string;
  homeLabel?: string;
  /** Optional follow-up action, e.g. "Plan your visit". */
  nextStep?: { label: string; href: string };
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // The panel replaces a long form; bring it into view and move focus so
  // keyboard and screen-reader users hear the confirmation.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus({ preventScroll: true });
  }, []);

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-white via-slate-50/50 to-emerald-50/30 p-8 text-center shadow-[0_20px_50px_rgba(16,185,129,0.08)] backdrop-blur-xl focus:outline-none sm:p-12"
    >
      {/* Subtle Ambient Background Radial Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />

      {/* Animated Checkmark Icon Badge */}
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20 duration-1000" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-lg shadow-emerald-500/30">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Main Title & Message */}
      <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">{message}</p>

      {referenceId ? (
        <div className="mx-auto mt-6 max-w-xs rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Your Reference ID
          </span>
          <span className="mt-1 block font-mono text-xl font-extrabold tracking-wider text-brand-dark select-all">
            {referenceId}
          </span>
          <span className="mt-1 block text-[11px] text-slate-500">Please keep this for your records.</span>
        </div>
      ) : null}

      {/* Action CTAs */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {nextStep ? (
          <Button
            href={nextStep.href}
            className="rounded-full bg-brand-red px-7 py-3 text-sm font-semibold tracking-wide text-white transition-all hover:bg-brand-red-dark active:scale-95"
          >
            {nextStep.label}
          </Button>
        ) : null}
        <Button
          href="/"
          variant="ghost"
          className="rounded-full px-8 py-3 text-sm font-semibold tracking-wide text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95"
        >
          {homeLabel}
        </Button>
      </div>
    </div>
  );
}
