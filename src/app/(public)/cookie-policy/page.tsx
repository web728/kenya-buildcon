import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import Link from "next/link";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "How kenyabuildcon.com uses essential, analytics and marketing cookies, and how to manage your cookie preferences at any time.",
  path: "/cookie-policy",
});

const COOKIE_TYPES = [
  {
    name: "Essential & Security Core",
    badge: "Always Active",
    badgeColor: "green",
    duration: "Session / 1 Year",
    body: "Strictly necessary for the secure infrastructure of the portal. These cookies enable core functionality such as session integrity, CSRF mitigation, and caching your preferences. They cannot be deactivated.",
  },
  {
    name: "Performance & Audience Analytics",
    badge: "Consent Required",
    badgeColor: "blue",
    duration: "Up to 24 Months",
    body: "Collects aggregated, pseudonymous metrics detailing visitor pathways, dwell times, and international country delegations. Governed by Google Analytics standards to optimize digital expo accessibility.",
  },
  {
    name: "Commercial & Targeted Media",
    badge: "Consent Required",
    badgeColor: "blue",
    duration: "90 Days - 1 Year",
    body: "Enables bilateral business-matching intelligence and measures our international campaign reach across Google, Meta, and LinkedIn channels. Deployed exclusively upon explicit authorization.",
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Cookie Governance Policy"
        intro="Our transparent commitment to digital privacy, security infrastructure, and international visitor data protection standards."
      />

      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Subtle Architectural Vector Grid Pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cookie-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#071118" strokeWidth="0.85" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cookie-grid)" />
          </svg>
        </div>

        <Container className="max-w-4xl relative z-10">
          {/* Header Context Pill */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-8 border-b border-slate-200/80">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/[0.06] px-3.5 py-1">
                <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                  Compliance Framework 2027
                </span>
              </div>
              <h2 className="mt-2.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-dark">
                How We Use Cookies &amp; Tracking
              </h2>
            </div>

            <div className="text-xs text-slate-400 font-medium">
              Effective: October 2026
            </div>
          </div>

          {/* Overview Statement Card */}
          <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
              When navigating <strong className="font-semibold text-brand-dark">{event.websiteDisplay}</strong>, we deploy small cryptographic data tokens (cookies) to elevate portal operational responsiveness, ensure fail-safe transaction security during booth booking registrations, and aggregate international trade insights across East Africa.
            </p>
          </div>

          {/* Structured Cookie Tiers */}
          <div className="mt-8 space-y-4">
            {COOKIE_TYPES.map((c) => {
              const isGreen = c.badgeColor === "green";
              return (
                <div
                  key={c.name}
                  className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all hover:border-brand-red/40 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className={`h-2 w-2 rounded-full ${isGreen ? "bg-brand-green" : "bg-brand-red"}`} />
                      <h3 className="text-base font-bold text-brand-dark">{c.name}</h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-slate-400">
                        {c.duration}
                      </span>
                      <span
                        className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          isGreen
                            ? "border border-brand-green/30 bg-emerald-50 text-brand-green"
                            : "border border-brand-red/30 bg-red-50 text-brand-red"
                        }`}
                      >
                        {c.badge}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                    {c.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Dual Organisers Contact & Inquiries Strip */}
          <div className="mt-12 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-brand-dark">Questions Regarding Data Governance?</h4>
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                Direct all privacy rights and consent queries to the joint secretariat.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                href={`mailto:${event.contact.futurex.email}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:border-brand-red hover:text-brand-red transition-all"
              >
                Futurex Privacy Desk
              </Link>
              <Link
                href={`mailto:${event.contact.etsipl.email}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:border-brand-green hover:text-brand-green transition-all"
              >
                ETSIPL Compliance
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}