"use client";

import { event } from "@/config/event";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", company: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("kbcn_cookie_consent_v1");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleQuickAccept = () => {
    localStorage.setItem("kbcn_cookie_consent_v1", "accepted_anonymous");
    setShow(false);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/cookie-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      localStorage.setItem("kbcn_cookie_consent_v1", "accepted_with_profile");
      setShow(false);
    } catch {
      localStorage.setItem("kbcn_cookie_consent_v1", "accepted_with_profile");
      setShow(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl overflow-hidden rounded-3xl border border-white/20 bg-[#071118]/95 p-6 text-white shadow-2xl backdrop-blur-2xl"
        >
          {/* Ambient Corner Glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-red/20 blur-xl" />

          {!showForm ? (
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red">
                  Privacy &amp; Cookie Preferences
                </span>
              </div>

              <h4 className="mt-2 text-base font-bold text-white">
                Customize Your {event.shortName} {event.edition} Experience
              </h4>

              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed font-normal">
                We use cookies to ensure optimal registration workflows, prevent bot duplicates, and deliver direct trade delegation insights.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="rounded-full bg-brand-red px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-brand-red-dark transition-all cursor-pointer"
                >
                  Accept &amp; Get Official Alerts
                </button>

                <button
                  type="button"
                  onClick={handleQuickAccept}
                  className="rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                >
                  Accept Essential Only
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Stay Updated &bull; Trade Delegation Alerts
                </span>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-xl border border-white/15 bg-white/[0.05] px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-red"
                />
                <input
                  type="email"
                  required
                  placeholder="Business Email *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-xl border border-white/15 bg-white/[0.05] px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-red"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile / WhatsApp *"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="rounded-xl border border-white/15 bg-white/[0.05] px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-red"
                />
                <input
                  type="text"
                  placeholder="Company Name (Optional)"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="rounded-xl border border-white/15 bg-white/[0.05] px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-red"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-brand-red py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:bg-brand-red-dark transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Saving Preferences..." : "Confirm & Save Preferences →"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}