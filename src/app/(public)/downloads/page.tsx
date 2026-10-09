 
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getPublishedDownloads } from "@/lib/data/downloads";
import { BrochureDownloadForm } from "@/components/forms/BrochureDownloadForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Official Brochure",
  description:
    "Get the official Kenya Buildcon International Expo 2027 brochure. Explore exhibition details, exhibitor opportunities, visitor information and participation guidelines.",
  path: "/downloads",
});

export default async function DownloadsPage() {
  const downloads = await getPublishedDownloads();

  return (
    <>
      <PageHero
        title="Download Brochure"
        intro="Discover Kenya Buildcon International Expo 2027. Get the official exhibition brochure for event details, exhibiting opportunities and participation information."
      />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm sm:p-10">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">
                  Kenya Buildcon International Expo 2027
                </p>

                <h2 className="mt-3 text-2xl font-bold text-brand-dark sm:text-3xl">
                  Get Your Official Exhibition Brochure
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-brand-body sm:text-base">
                  Fill in the form below to access the official brochure and
                  learn more about the exhibition, business opportunities,
                  exhibitor participation and event highlights.
                </p>
              </div>

              <div className="mt-8">
                <BrochureDownloadForm />
              </div>
            </div>

            {downloads.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-5 text-xl font-bold text-brand-dark">
                  Additional Event Resources
                </h3>

                <div className="flex flex-col divide-y divide-brand-border rounded-xl border border-brand-border">
                  {downloads.map((download) => (
                    <a
                      key={download._id}
                      href={download.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-brand-light sm:p-6"
                    >
                      <div>
                        <p className="font-bold text-brand-dark">
                          {download.title}
                        </p>

                        {download.description && (
                          <p className="mt-1 text-sm leading-6 text-brand-body">
                            {download.description}
                          </p>
                        )}
                      </div>

                      <span className="shrink-0 text-sm font-semibold text-brand-red">
                        Download →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
