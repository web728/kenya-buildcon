import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getPublishedDownloads } from "@/lib/data/downloads";
import { BrochureDownloadForm } from "@/components/forms/BrochureDownloadForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Downloads",
  description:
    "Download the official Kenya Buildcon International Expo 2027 brochure — exhibitor profile, visitor profile and participation details.",
  path: "/downloads",
});

export default async function DownloadsPage() {
  const downloads = await getPublishedDownloads();

  return (
    <>
      <PageHero title="Downloads" intro="The official Kenya Buildcon 2027 brochure and other event resources." />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="mx-auto mb-16 max-w-2xl rounded-xl border border-brand-border p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">Exhibition Brochure</p>
            <h2 className="mt-1 text-2xl font-bold text-brand-dark">Get the Brochure</h2>
            <p className="mt-2 text-sm text-brand-body">
              Fill in your details below and the brochure will download automatically.
            </p>
            <div className="mt-6">
              <BrochureDownloadForm />
            </div>
          </div>

          {downloads.length === 0 ? (
            <EmptyState
              title="More Downloads Coming Soon"
              body="The floor plan, exhibitor manual and other resources will be published here as they become available."
            />
          ) : (
            <div className="flex flex-col divide-y divide-brand-border rounded-xl border border-brand-border">
              {downloads.map((d) => (
                <a  
                  key={d._id}
                  href={d.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 p-6 hover:bg-brand-light"
                >
                  <div>
                    <p className="text-base font-bold text-brand-dark">{d.title}</p>
                    {d.description ? <p className="mt-1 text-sm text-brand-body">{d.description}</p> : null}
                  </div>
                  <span className="flex-shrink-0 text-sm font-semibold text-brand-red">Download →</span>
                </a>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}