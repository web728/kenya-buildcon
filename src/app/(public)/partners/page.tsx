import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { PartnerEnquiryForm } from "@/components/forms/PartnerEnquiryForm";
import { getActivePartners, type PartnerSummary } from "@/lib/data/partners";
import { supportingAssociations } from "@/data/previousEdition";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Industry & Media Partners",
  description: "Supporting organisations, industry associations and media partners of Kenya Buildcon International Expo 2027, The Sarit Expo Centre, Nairobi.",
  path: "/partners",
});

const CATEGORIES = [
  "Supporting Organisation",
  "Association Partner",
  "Industry Partner",
  "Media Partner",
] as const;

export default async function PartnersPage() {
  let partners: PartnerSummary[] = [];

  try {
    partners = await getActivePartners();
  } catch {
    partners = [];
  }

  const byCategory = CATEGORIES.map((cat) => ({
    category: cat,
    items: partners.filter((p) => p.category === cat),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Industry Partners & Alliances"
        intro="Kenya Buildcon brings together the country's leading trade chambers and building-sector associations alongside international industry partners."
        image={{
          src: "/images/home/kenya-buildcon-inauguration.jpg",
          alt: "Partners and industry leaders at the Kenya Buildcon inaugural ceremony",
        }}
      />

      {/* Partners Display Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 border-b border-slate-200/80">
        {/* Background Architectural Vector Pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="partners-page-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1720" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#partners-page-grid)" />
          </svg>
        </div>

        <Container className="relative z-10 w-full">
          {byCategory.length === 0 ? (
            <div className="flex flex-col gap-8">
              <EmptyState
                title="4th Edition Partners Coming Soon"
                body="Supporting organisations and media partners for the 2027 edition will be listed here as they are confirmed."
              />
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-brand-dark">
                    Industry Associations at the Previous Edition
                  </h2>
                  <span className="text-xs font-semibold text-slate-400">Post Show Report</span>
                </div>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {supportingAssociations.map((name) => (
                    <li
                      key={name}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full bg-brand-green" aria-hidden="true" />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {byCategory.map((group) => (
                <div key={group.category} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-brand-dark">
                      {group.category}s
                    </h2>
                    <span className="text-xs font-semibold text-slate-400">
                      {group.items.length} {group.items.length === 1 ? "Partner" : "Partners"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {group.items.map((partner) => (
                      <PartnerLogo key={partner._id || partner.name} partner={partner} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Partnership Application Form Section */}
      <section className="relative py-14 sm:py-20 bg-white">
        <Container className="max-w-3xl">
          <div className="text-center pb-8 border-b border-slate-100">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/[0.06] px-3.5 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                Collaborate With Buildcon
              </span>
            </div>

            <h2 className="mt-3.5 text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-dark">
              Partnership &amp; Alliance Enquiry
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
              Submit your organization details to explore bilateral trade delegation hosting, official association endorsement, or media partnerships.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 sm:p-10 shadow-[0_2px_16px_rgb(0,0,0,0.02)]">
            <PartnerEnquiryForm />
          </div>
        </Container>
      </section>
    </div>
  );
}