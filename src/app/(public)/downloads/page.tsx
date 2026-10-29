import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { getPublishedDownloads } from "@/lib/data/downloads";
import { BrochureDownloadForm } from "@/components/forms/BrochureDownloadForm";

export const dynamic = "force-dynamic";

const PAGE_PATH = "/downloads";
const PAGE_TITLE = "Exhibition Brochure | Kenya Buildcon International Expo 2027";
const PAGE_DESCRIPTION =
  "Access the Kenya Buildcon International Expo 2027 brochure, including exhibition sectors, exhibitor and visitor profiles, and participation information.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),
};

function getStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return null;

  try {
    const base = new URL(siteUrl);
    if (!["https:", "http:"].includes(base.protocol)) return null;

    const pageUrl = new URL(PAGE_PATH, base).toString();
    const homeUrl = new URL("/", base).toString();

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: PAGE_TITLE,
          description: PAGE_DESCRIPTION,
          inLanguage: "en",
          breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: homeUrl },
            { "@type": "ListItem", position: 2, name: "Downloads", item: pageUrl },
          ],
        },
      ],
    };
  } catch {
    return null;
  }
}

function FileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M6 3h9l4 4v14H6a2 2 0 01-2-2V5a2 2 0 012-2Z" />
      <path d="M15 3v5h5M8 13h8M8 17h6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M6 18 18 6M8 6h10v10" />
    </svg>
  );
}

export default async function DownloadsPage() {
  const downloads = await getPublishedDownloads();
  const structuredData = getStructuredData();

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#BE202B] selection:text-white">
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <PageHero
        title="Exhibition"
        highlightTitle="Brochure."
        badgeText="EVENT DOWNLOADS"
        intro="Access the Kenya Buildcon International Expo 2027 brochure for exhibition sectors, visitor profiles and participation information."
      />

      <section
        aria-labelledby="brochure-heading"
        className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <Container className="relative z-10">
          <div className="mx-auto max-w-[900px]">
            <div className="mb-7 border-b border-[#111111]/10 pb-6">
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-7 bg-[#BE202B]" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#BE202B]">
                  Event Brochure
                </span>
              </div>

              <h2
                id="brochure-heading"
                className="mt-3 text-[clamp(1.85rem,3vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#111111]"
              >
                Get the <span className="text-[#BE202B]">Exhibition Brochure.</span>
              </h2>
              <p className="mt-3 max-w-[720px] text-[13px] leading-[1.85] text-[#666666] sm:text-[14px]">
                Complete the form to access the brochure and review the exhibition
                profile, visitor information and participation details.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#111111]/10 bg-white shadow-[0_16px_45px_rgba(17,17,17,0.045)]">
              <div aria-hidden="true" className="flex h-[3px]">
                <span className="w-[82%] bg-[#BE202B]" />
                <span className="w-[13%] bg-[#25B34B]" />
                <span className="flex-1 bg-[#111111]" />
              </div>
              <div className="p-5 sm:p-8 lg:p-10">
                <BrochureDownloadForm />
              </div>
            </div>
          </div>

          {downloads.length > 0 && (
            <section
              aria-labelledby="additional-resources-heading"
              className="mx-auto mt-12 max-w-[900px] sm:mt-16"
            >
              <div className="mb-6 border-b border-[#111111]/10 pb-5">
                <div className="flex items-center gap-2.5">
                  <span className="h-[2px] w-7 bg-[#BE202B]" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#BE202B]">
                    Downloads
                  </span>
                </div>
                <h2
                  id="additional-resources-heading"
                  className="mt-3 text-[clamp(1.6rem,2.5vw,2.2rem)] font-extrabold tracking-[-0.035em] text-[#111111]"
                >
                  Additional <span className="text-[#BE202B]">Resources.</span>
                </h2>
              </div>

              <div className="overflow-hidden rounded-lg border border-[#111111]/10 bg-white">
                {downloads.map((download) => (
                  <a
                    key={download.fileUrl}
                    href={download.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 border-b border-[#111111]/[0.07] p-4 transition-colors duration-300 last:border-b-0 hover:bg-[#F8F8F8] sm:items-center sm:p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#BE202B]/[0.07] text-[#BE202B] transition-colors duration-300 group-hover:bg-[#BE202B] group-hover:text-white">
                      <FileIcon />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-extrabold leading-[1.5] text-[#111111]">
                        {download.title}
                      </span>
                      {download.description && (
                        <span className="mt-1 block text-[12px] leading-[1.75] text-[#777777]">
                          {download.description}
                        </span>
                      )}
                    </span>
                    <span className="flex shrink-0 items-center gap-2 text-[11px] font-extrabold text-[#BE202B]">
                      <span className="hidden sm:inline">View File</span>
                      <ArrowIcon />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </Container>
      </section>
    </div>
  );
}
