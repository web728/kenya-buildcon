import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions",
  description:
    "Terms and conditions for using kenyabuildcon.com, the official website of Kenya Buildcon International Expo 2027, Nairobi.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms and Conditions" />
      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-8 text-sm leading-relaxed text-brand-body">
            <p>
              These Terms and Conditions govern your use of {event.websiteDisplay}, operated by{" "}
              {event.organisers[0].name} and {event.organisers[1].name} as joint organisers of{" "}
              {event.name}.
            </p>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">Use of This Website</h2>
              <p className="mt-2">
                This website is provided for informational purposes relating to {event.name},
                taking place {event.dates.display} at {event.venue.fullLocation}. You agree to use
                this website only for lawful purposes and in a manner that does not infringe the
                rights of, or restrict or inhibit the use of, this website by any third party.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">Exhibitor &amp; Visitor Submissions</h2>
              <p className="mt-2">
                Submitting an exhibitor enquiry, stand booking request or visitor registration
                through this website constitutes an expression of interest only and does not
                guarantee stand allocation, exhibitor confirmation or visitor entry. All
                participation is subject to separate confirmation, applicable terms and, where
                relevant, a signed exhibitor agreement issued by the organisers.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">Intellectual Property</h2>
              <p className="mt-2">
                All content on this website, including the {event.shortName} name, logo and brand
                motif, is the property of the organisers and may not be reproduced without prior
                written consent.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">Changes to the Event</h2>
              <p className="mt-2">
                The organisers reserve the right to amend event dates, venue details or the
                content of this website at any time. Material changes will be reflected on this
                website as soon as reasonably practicable.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">Limitation of Liability</h2>
              <p className="mt-2">
                While we take reasonable care to keep information on this website accurate and
                up to date, we make no warranties about the completeness or accuracy of the
                content and accept no liability for any loss arising from reliance on it.
              </p>
            </div>

            <p className="text-xs text-brand-body/70">Last updated: 8 October 2026.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
