import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { getActivePartners, type PartnerSummary } from "@/lib/data/partners";
import { OrganiserLogos } from "@/components/ui/OrganiserLogos";

export async function PartnersSection() {
  let partners: PartnerSummary[] = [];

  try {
    partners = await getActivePartners();
  } catch {
    partners = [];
  }

  const hasPartners = partners && partners.length > 0;

  return (
    <section className="relative overflow-hidden bg-slate-50/60 py-16 sm:py-24 text-slate-900 border-b border-slate-200/80">
      {/* Background Architectural Vector Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <Container className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* Centered Header Bar                                      */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto pb-10 border-b border-slate-200/80">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red">
              Organised By &amp; Supporting Alliances
            </span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Event Organisers &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-dark to-brand-green">
              Strategic Partners
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 font-normal max-w-2xl">
            Brought together by international exhibition pioneers in cooperation with regional trade federations and industrial authorities.
          </p>

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-sm transition-all duration-300 hover:border-brand-red hover:text-brand-red hover:shadow-md active:scale-95"
            >
              Partner With Us →
            </Link>
          </div>
        </div>

{/* ========================================================= */}
{/* Centered Joint Organisers Spotlight Row                   */}
{/* ========================================================= */}
<div className="mt-10 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 lg:p-8 shadow-sm text-center lg:text-left">
  <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
    <div className="max-w-xl">
      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
        Official Joint Organisers
      </span>
      <h3 className="mt-1.5 text-lg sm:text-xl font-bold tracking-tight text-slate-900">
        Futurex Trade Fair &amp; Events &bull; ETSIPL
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
        Global exhibition pioneers delivering premier international trade fairs across Africa and Asia, connecting thousands of exhibitors with professional trade buyers.
      </p>
    </div>

    {/* Organisers Logos Lockup */}
    <div className="w-full lg:w-auto flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
      <OrganiserLogos />
    </div>
  </div>
</div>

        {/* ========================================================= */}
        {/* Dynamic Partner Grid                                      */}
        {/* ========================================================= */}
        {hasPartners ? (
          <div className="mt-10 text-center">
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Supporting Associations &amp; Media
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {partners.map((partner) => (
                <PartnerLogo
                  key={partner._id || partner.name}
                  partner={partner}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-6 text-center sm:text-left">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-red shrink-0" />
              <span>
                The previous edition was supported by the Kenya National Chamber of Commerce &amp; Industry (KNCCI) and KABCEC. Supporting partners for the 4th edition will be announced here.
              </span>
            </div>

            <Link
              href="/contact"
              className="text-xs font-bold text-brand-red hover:underline whitespace-nowrap shrink-0"
            >
              Become a Supporting Partner →
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}