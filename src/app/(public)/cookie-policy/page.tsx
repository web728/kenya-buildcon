
import type { Metadata } from "next";
import Link from "next/link";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy | Kenya Buildcon International Expo 2027",
  description:
    "Learn how the Kenya Buildcon International Expo 2027 website uses cookies, what they are used for and how to manage your cookie preferences.",
  path: "/cookie-policy",
});

const COOKIE_TYPES = [
  {
    name: "Essential Cookies",
    badge: "Required",
    badgeColor: "green",
    body:
      "These cookies support basic website functions, such as security, navigation and saving cookie preferences. They are necessary for certain parts of the website to work properly.",
  },
  {
    name: "Analytics Cookies",
    badge: "Optional",
    badgeColor: "red",
    body:
      "Analytics cookies help us understand how visitors use the website, including which pages are visited and how the site performs. Where used, this information helps us improve the website.",
  },
  {
    name: "Marketing Cookies",
    badge: "Optional",
    badgeColor: "red",
    body:
      "Marketing cookies may be used to measure advertising performance and understand how visitors reach our website through promotional campaigns. These cookies are used only where applicable and permitted.",
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Cookie"
        highlightTitle="Policy."
        intro="Learn how cookies are used on our website and how you can manage your preferences."
      />

      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
        {/* Background Pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="cookie-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#071118"
                  strokeWidth="0.85"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#cookie-grid)"
            />
          </svg>
        </div>

        <Container className="relative z-10 max-w-4xl">
          {/* Section Introduction */}
          <div className="border-b border-slate-200/80 pb-6">
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-7 bg-brand-red" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-red">
                Website Privacy
              </span>
            </div>

            <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.18] tracking-[-0.04em] text-brand-dark">
              How We Use{" "}
              <span className="text-brand-red">
                Cookies.
              </span>
            </h2>

            <p className="mt-3 max-w-[700px] text-[13px] leading-[1.85] text-slate-600 sm:text-[14px]">
              This Cookie Policy explains how cookies
              and similar technologies may be used on{" "}
              <strong className="font-semibold text-brand-dark">
                {event.websiteDisplay}
              </strong>
              , the website for {event.name}.
            </p>
          </div>

          {/* What Are Cookies */}
          <div className="mt-7 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h3 className="text-[17px] font-bold text-brand-dark">
              What Are Cookies?
            </h3>

            <p className="mt-3 text-[13px] leading-[1.85] text-slate-600 sm:text-[14px]">
              Cookies are small text files stored
              on your device when you visit a website.
              They help websites remember certain
              information, support basic functions
              and understand how visitors use the site.
            </p>
          </div>

          {/* Cookie Categories */}
          <div className="mt-8">
            <h3 className="text-[19px] font-extrabold tracking-[-0.025em] text-brand-dark">
              Types of Cookies
            </h3>

            <p className="mt-2 text-[13px] leading-[1.8] text-slate-600">
              The following categories explain the
              cookies that may be used on our website.
            </p>

            <div className="mt-5 space-y-3">
              {COOKIE_TYPES.map((cookie) => {
                const isEssential =
                  cookie.badgeColor === "green";

                return (
                  <div
                    key={cookie.name}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 hover:border-brand-red/30 sm:p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isEssential
                              ? "bg-brand-green"
                              : "bg-brand-red"
                          }`}
                        />

                        <h4 className="text-[15px] font-bold text-brand-dark">
                          {cookie.name}
                        </h4>
                      </div>

                      <span
                        className={`rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${
                          isEssential
                            ? "border-brand-green/20 bg-green-50 text-brand-green"
                            : "border-brand-red/20 bg-red-50 text-brand-red"
                        }`}
                      >
                        {cookie.badge}
                      </span>
                    </div>

                    <p className="mt-3 text-[13px] leading-[1.85] text-slate-600">
                      {cookie.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cookie Preferences */}
          <div className="mt-9 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h3 className="text-[17px] font-bold text-brand-dark">
              Managing Your Cookie Preferences
            </h3>

            <p className="mt-3 text-[13px] leading-[1.85] text-slate-600 sm:text-[14px]">
              You can manage or delete cookies
              through your browser settings.
              Most browsers allow you to block
              certain cookies or remove cookies
              that have already been stored.
            </p>

            <p className="mt-3 text-[13px] leading-[1.85] text-slate-600 sm:text-[14px]">
              Disabling essential cookies may
              affect some website functions.
              Where optional cookies require
              consent, they should not be used
              unless the required permission
              has been given.
            </p>
          </div>

          {/* Third-Party Cookies */}
          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h3 className="text-[17px] font-bold text-brand-dark">
              Third-Party Services
            </h3>

            <p className="mt-3 text-[13px] leading-[1.85] text-slate-600 sm:text-[14px]">
              Some website features, such as
              embedded maps, videos or analytics
              services, may use technologies
              provided by third parties.
              Where these services are used,
              their data practices may also
              be governed by their own
              privacy and cookie policies.
            </p>
          </div>

          {/* Policy Updates */}
          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h3 className="text-[17px] font-bold text-brand-dark">
              Changes to This Policy
            </h3>

            <p className="mt-3 text-[13px] leading-[1.85] text-slate-600 sm:text-[14px]">
              We may update this Cookie Policy
              when our website features,
              cookie practices or legal
              requirements change.
              The updated policy will be
              published on this page.
            </p>
          </div>

          {/* Contact and Privacy */}
          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h3 className="text-[15px] font-bold text-brand-dark">
                Questions About Cookies?
              </h3>

              <p className="mt-1 text-[12px] leading-[1.75] text-slate-600">
                Contact our organising team
                for questions about this policy.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/privacy-policy"
                className="inline-flex min-h-[42px] items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-4 py-2.5 text-[11px] font-bold text-brand-dark transition-colors hover:border-brand-red hover:text-brand-red"
              >
                Privacy Policy
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-[42px] items-center justify-center rounded-md bg-brand-red px-4 py-2.5 text-[11px] font-bold text-white transition-colors hover:opacity-90"
              >
                Contact Us
              </Link>
            </div>
          </div>
 
        </Container>
      </section>
    </div>
  );
}
