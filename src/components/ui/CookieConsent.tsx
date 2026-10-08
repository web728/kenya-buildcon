"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { readConsent, writeConsent, type ConsentPreferences } from "@/lib/utils/cookieConsent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads localStorage, which only exists client-side; must happen post-mount.
    if (!readConsent()) setVisible(true);
  }, []);

  // The banner is fixed to the bottom of the viewport, which can otherwise
  // sit on top of — and swallow clicks on — page content underneath it
  // (e.g. a form's submit button on a short mobile screen). Reserve that
  // space at the bottom of the page for as long as the banner is shown.
  useEffect(() => {
    if (!visible) {
      document.body.style.paddingBottom = "";
      return;
    }

    const el = bannerRef.current;
    if (!el) return;

    const updatePadding = () => {
      document.body.style.paddingBottom = `${el.offsetHeight}px`;
    };
    updatePadding();

    const observer = new ResizeObserver(updatePadding);
    observer.observe(el);

    return () => {
      observer.disconnect();
      document.body.style.paddingBottom = "";
    };
  }, [visible, showManage]);

  function save(prefs: ConsentPreferences) {
    writeConsent(prefs);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[90] translate-y-0 border-t border-brand-border bg-white px-5 py-5 opacity-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-[transform,opacity] duration-200 ease-out starting:translate-y-4 starting:opacity-0 sm:px-8"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-2xl text-sm text-brand-body">
          We use cookies for essential site functionality and, with your consent, analytics and
          marketing. Read our{" "}
          <Link href="/cookie-policy" className="text-brand-red underline">
            Cookie Policy
          </Link>
          .
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowManage((v) => !v)}
            className="rounded-md border border-brand-border px-4 py-2 text-sm font-semibold text-brand-dark transition-[background-color,transform] duration-150 ease-out hover:bg-brand-light active:scale-[0.97]"
          >
            Manage Preferences
          </button>
          <button
            type="button"
            onClick={() => save({ essential: true, analytics: false, marketing: false })}
            className="rounded-md border border-brand-border px-4 py-2 text-sm font-semibold text-brand-dark transition-[background-color,transform] duration-150 ease-out hover:bg-brand-light active:scale-[0.97]"
          >
            Reject Non-Essential
          </button>
          <button
            type="button"
            onClick={() => save({ essential: true, analytics: true, marketing: true })}
            className="rounded-md bg-brand-red px-4 py-2 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-brand-red-dark active:scale-[0.97]"
          >
            Accept All
          </button>
        </div>
      </div>

      {showManage ? (
        <div className="mx-auto mt-5 flex max-w-5xl flex-col gap-3 border-t border-brand-border pt-5">
          <label className="flex items-center gap-3 text-sm text-brand-body">
            <input type="checkbox" checked disabled className="h-4 w-4 rounded border-brand-border" />
            Essential — always on
          </label>
          <label className="flex items-center gap-3 text-sm text-brand-body">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="h-4 w-4 rounded border-brand-border"
            />
            Analytics
          </label>
          <label className="flex items-center gap-3 text-sm text-brand-body">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="h-4 w-4 rounded border-brand-border"
            />
            Marketing
          </label>
          <button
            type="button"
            onClick={() => save({ essential: true, analytics, marketing })}
            className="mt-1 w-fit rounded-md bg-brand-red px-4 py-2 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-brand-red-dark active:scale-[0.97]"
          >
            Save Preferences
          </button>
        </div>
      ) : null}
    </div>
  );
}
