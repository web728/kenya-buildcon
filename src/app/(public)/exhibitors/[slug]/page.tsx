import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getExhibitorBySlug } from "@/lib/data/exhibitors";
import { event } from "@/config/event";
import { pageMetadata } from "@/lib/seo/pageMetadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exhibitor = await getExhibitorBySlug(slug);
  if (!exhibitor) return { title: "Exhibitor Not Found", robots: { index: false, follow: true } };
  return pageMetadata({
    title: `${exhibitor.companyName} | Exhibitor`,
    description:
      exhibitor.shortDescription ||
      `${exhibitor.companyName} exhibiting at ${event.name}, ${event.venue.fullLocation}.`,
    path: `/exhibitors/${slug}`,
  });
}

export default async function ExhibitorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exhibitor = await getExhibitorBySlug(slug);
  if (!exhibitor) notFound();

  return (
    <div className="relative min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white pt-36 sm:pt-44 pb-12 sm:pb-16">
      {/* Background Architectural Vector Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="detail-page-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1720" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#detail-page-grid)" />
        </svg>
      </div>

      <Container className="max-w-4xl">
        {/* Modern Breadcrumb Row */}
        <div className="pb-6">
          <Breadcrumb
            items={[
              { label: "Exhibitor Directory", href: "/exhibitors" },
              { label: exhibitor.companyName },
            ]}
          />
        </div>

        {/* ========================================================= */}
        {/* Main Frosted Showcase Glass Card                          */}
        {/* ========================================================= */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-10 shadow-[0_4px_24px_rgb(0,0,0,0.03)] backdrop-blur-xl">
          {/* Header Block: Logo & Core Identifiers */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between pb-8 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {exhibitor.logoUrl ? (
                <div className="relative h-16 w-40 shrink-0 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 flex items-center justify-center">
                  <Image
                    src={exhibitor.logoUrl}
                    alt={exhibitor.companyName}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-red/[0.08] text-xl font-bold text-brand-red">
                  {exhibitor.companyName.charAt(0)}
                </div>
              )}

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/[0.06] px-3 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-red">
                    {exhibitor.category || "Exhibitor"}
                  </span>
                </div>

                <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] leading-tight text-brand-dark">
                  {exhibitor.companyName}
                </h1>

                <p className="mt-1 text-xs font-medium text-slate-500 flex items-center gap-2">
                  <span>{exhibitor.country || "International"}</span>
                  {exhibitor.standNumber && (
                    <>
                      <span>&bull;</span>
                      <span className="font-bold text-brand-dark">
                        Booth Space {exhibitor.standNumber}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Stand Allocation Pill */}
            <div className="shrink-0 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 text-center sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Venue Location
              </span>
              <span className="text-xs font-bold text-brand-dark">
                {event.venue.name}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {event.dates.display}
              </span>
            </div>
          </div>

          {/* Company Narrative */}
          {exhibitor.shortDescription && (
            <div className="mt-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block">
                Company Overview
              </span>
              <p className="mt-2 text-xs sm:text-[13.5px] leading-[1.75] text-slate-600 font-normal">
                {exhibitor.shortDescription}
              </p>
            </div>
          )}

          {/* Displayed Products / Scope */}
          {exhibitor.products && exhibitor.products.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block">
                Products &amp; Solutions on Display
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {exhibitor.products.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="mt-10 flex flex-wrap items-center gap-3 pt-6 border-t border-slate-100">
            {exhibitor.website && (
              <a
                href={exhibitor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-brand-red-dark transition-all duration-200"
              >
                Visit Official Website ↗
              </a>
            )}

            {exhibitor.brochureUrl && (
              <a
                href={exhibitor.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:border-brand-red hover:text-brand-red transition-all duration-200"
              >
                Download Catalog ↓
              </a>
            )}

            <Link
              href="/exhibitors"
              className="inline-flex items-center justify-center rounded-full border border-transparent bg-slate-100 px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-all duration-200"
            >
              ← Back to Directory
            </Link>
          </div>
        </div>

        {/* Bottom Booking / Meeting Request Callout */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-brand-red/20 bg-gradient-to-r from-brand-red/[0.04] via-white to-brand-green/[0.04] p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-dark">
                Meet {exhibitor.companyName} at the Show
              </h4>
              <p className="text-[11px] text-slate-500 font-normal">
                Visitor registration is free — {event.dates.display} at {event.venue.fullLocation}.
              </p>
            </div>
          </div>

          <Link
            href={event.cta.registerVisit}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-brand-red px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-brand-red-dark transition-all duration-200"
          >
            Register to Visit
          </Link>
        </div>
      </Container>
    </div>
  );
}