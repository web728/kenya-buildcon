import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Kenya Buildcon International Expo collects, uses and protects personal data submitted through the kenyabuildcon.com website and its forms.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-8 text-sm leading-relaxed text-brand-body">
            <p>
              This Privacy Policy explains how {event.organisers[0].name} and {event.organisers[1].name}{" "}
              (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collect, use and protect personal
              information submitted through {event.websiteDisplay} in connection with{" "}
              {event.name}.
            </p>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">Information We Collect</h2>
              <p className="mt-2">
                When you submit an exhibitor enquiry, visitor registration, contact form,
                partnership enquiry or newsletter subscription, we collect the information you
                provide, which may include your name, company, designation, country, email
                address and mobile/WhatsApp number. We also automatically record technical
                information such as IP address, browser user-agent and UTM campaign parameters
                for spam prevention and marketing attribution.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">How We Use Your Information</h2>
              <ul className="mt-2 list-disc pl-5">
                <li>To respond to enquiries and process exhibitor and visitor registrations</li>
                <li>To send confirmation emails and event-related communications</li>
                <li>To maintain internal records via our database and operational spreadsheets</li>
                <li>To improve the website and understand marketing campaign performance</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">Data Storage &amp; Sharing</h2>
              <p className="mt-2">
                Submitted data is stored in our secure database and, for operational purposes, a
                copy may be synced to an internal Google Sheets workspace accessible only to the
                organising team. We do not sell personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">Cookies</h2>
              <p className="mt-2">
                We use cookies for essential site functionality and, where you consent, analytics
                and marketing purposes. See our{" "}
                <a href="/cookie-policy" className="text-brand-red underline">Cookie Policy</a>{" "}
                for details.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">Your Rights</h2>
              <p className="mt-2">
                Under applicable data protection laws, including Kenya&apos;s Data Protection Act, 2019,
                you may request access to, correction of, or deletion of your personal information by
                contacting us at the details listed on our{" "}
                <a href="/contact" className="text-brand-red underline">Contact page</a>.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">Contact</h2>
              <p className="mt-2">
                For privacy-related questions, please contact us via the{" "}
                <a href="/contact" className="text-brand-red underline">Contact page</a>.
              </p>
            </div>

            <p className="text-xs text-brand-body/70">Last updated: 8 October 2026.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
