import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { ExhibitorDirectory } from "@/components/sections/ExhibitorDirectory";
import { getPublishedExhibitors } from "@/lib/data/exhibitors";
import { ExhibitorDirectoryWrapper } from "@/components/exhibit/ExhibitorDirectoryWrapper";
import { exhibitionSectors } from "@/data/exhibitionProfile";
import { pastParticipants } from "@/data/previousEdition";
import { event } from "@/config/event";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Exhibitor Directory",
  description: "Explore manufacturers, machinery producers and building material suppliers exhibiting at Kenya Buildcon International Expo 2027, The Sarit Expo Centre, Nairobi.",
  path: "/exhibitors",
});

export default async function ExhibitorsPage() {
  const exhibitors = await getPublishedExhibitors();

  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Participating Exhibitors & Brands"
        intro="Browse international manufacturers, local suppliers and technology innovators showcasing building and construction solutions at The Sarit Expo Centre, Nairobi."
        image={{
          src: "/images/sectors/exhibitor-stand.jpg",
          alt: "Exhibitor stand on the Kenya Buildcon exhibition floor",
        }}
      />

      <section className="relative overflow-hidden py-14 sm:py-20 border-b border-slate-200/80">
        {/* Background Architectural Vector Pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dir-page-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1720" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dir-page-grid)" />
          </svg>
        </div>

        <Container className="relative z-10 w-full">
          {exhibitors.length === 0 ? (
            <div className="flex flex-col gap-10">
              <EmptyState
                title="2027 Exhibitor List Coming Soon"
                body="Confirmed exhibitors for the 4th edition will be listed here as stand bookings are finalised. Book now to be among the first featured."
              />

              {/* Previous edition participants (Post Show Report) */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between pb-5 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                      Previous Edition
                    </span>
                    <h2 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-brand-dark">
                      Prominent Participating Brands &amp; Companies
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400">250+ brands exhibited · Post Show Report</span>
                </div>
                <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                  {pastParticipants.map((name) => (
                    <li
                      key={name}
                      className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3.5 py-2.5 text-xs font-semibold text-slate-700"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" aria-hidden="true" />
                      {name}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                  <p className="text-xs text-slate-500">Want your company listed for 2027?</p>
                  <Link
                    href={event.cta.bookStand}
                    className="inline-flex items-center justify-center rounded-full bg-brand-red px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-brand-red-dark transition-all"
                  >
                    Book a Stand →
                  </Link>
                </div>
              </div>

              {/* Brochure What's on Display Snapshot */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                      Official Exhibition Scope
                    </span>
                    <h2 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-brand-dark">
                      What&apos;s on Display?
                    </h2>
                  </div>
                  <Link href="/exhibition-profile" className="text-xs font-semibold text-brand-red hover:underline">
                    Full exhibition profile →
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {exhibitionSectors.map(({ name: sector }) => (
                    <span
                      key={sector}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-brand-red/40 hover:bg-white hover:text-brand-dark"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <ExhibitorDirectoryWrapper>
              <ExhibitorDirectory exhibitors={exhibitors} />
            </ExhibitorDirectoryWrapper>
          )}
        </Container>
      </section>
    </div>
  );
}