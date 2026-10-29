
import type { Metadata } from "next";
import Link from "next/link";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions | Kenya Buildcon International Expo 2027",
  description:
    "Read the terms and conditions for using the Kenya Buildcon International Expo 2027 website, including enquiries, registrations and event information.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms &"
        highlightTitle="Conditions."
        // intro="Please read these terms before using our website or submitting an exhibition enquiry or visitor registration."
      />

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-8 text-sm leading-relaxed text-brand-body">
           

            <div>
              <h2 className="text-lg font-bold text-brand-dark">
                Use of This Website
              </h2>

              <p className="mt-2">
                This website provides information about
                the exhibition, including participation,
                visitor registration, industry sectors
                and event updates.
              </p>

              <p className="mt-2">
                You agree to use the website lawfully
                and not to interfere with its operation,
                misuse its forms or attempt to access
                restricted systems without permission.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">
                Information and Enquiries
              </h2>

              <p className="mt-2">
                When submitting an enquiry or
                registration form, you should provide
                accurate and relevant information.
                The organisers may contact you using
                the details provided to respond to
                your request or manage your participation.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">
                Exhibitor Participation
              </h2>

              <p className="mt-2">
                Submitting a stand enquiry or booking
                request does not automatically confirm
                exhibition space. Stand allocation,
                participation fees, payment terms,
                cancellation conditions and other
                arrangements are subject to confirmation
                and any applicable exhibitor agreement.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">
                Visitor Registration
              </h2>

              <p className="mt-2">
                Visitors may register through the
                website to attend the exhibition.
                Registration is subject to the
                applicable entry requirements and
                any instructions provided by the
                organising team.
              </p>

              <p className="mt-2">
                The organisers may request registration
                confirmation or identification
                where necessary for event access.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">
                Website Content
              </h2>

              <p className="mt-2">
                We aim to keep website information
                accurate and up to date. However,
                exhibition details, product categories,
                planned activities and other information
                may change as preparations continue.
              </p>

              <p className="mt-2">
                Product categories and exhibition
                descriptions do not guarantee the
                participation of any particular
                company or the availability of
                specific products at the event.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">
                Changes to the Exhibition
              </h2>

              <p className="mt-2">
                The organisers may make changes to
                exhibition dates, venue arrangements,
                programmes or other event details
                when necessary.
              </p>

              <p className="mt-2">
                Important updates will be communicated
                through appropriate event channels
                or published on the website.
                Any rights under a separate
                participation agreement or applicable
                law will continue to apply.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">
                Intellectual Property
              </h2>

              <p className="mt-2">
                Website content, including text,
                photographs, graphics, logos and
                other materials, belongs to the
                organisers or the respective
                rights holders.
              </p>

              <p className="mt-2">
                You may view the website for
                personal or business information.
                Reproducing or distributing its
                content without permission is
                not allowed, except where
                permitted by law.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">
                External Websites
              </h2>

              <p className="mt-2">
                This website may contain links to
                external websites, including
                government services, maps and
                industry organisations.
              </p>

              <p className="mt-2">
                These websites are managed by
                third parties and may have their
                own terms and privacy policies.
                We are not responsible for
                their content or operation.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">
                Limitation of Liability
              </h2>

              <p className="mt-2">
                We take reasonable care in providing
                website information but cannot
                guarantee that all content will
                always be complete, accurate
                or available without interruption.
              </p>

              <p className="mt-2">
                To the extent permitted by applicable
                law, the organisers are not responsible
                for losses arising solely from
                website errors, interruptions
                or reliance on general website
                information. This does not limit
                any rights or responsibilities
                that cannot legally be excluded.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">
                Privacy and Personal Information
              </h2>

              <p className="mt-2">
                Personal information submitted
                through this website is handled
                in accordance with our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-brand-red underline"
                >
                  Privacy Policy
                </Link>
                . Please review that policy
                to understand how your
                information is collected,
                used and managed.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">
                Updates to These Terms
              </h2>

              <p className="mt-2">
                We may update these Terms and
                Conditions when necessary.
                The latest version will
                be available on this page.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-dark">
                Contact Us
              </h2>

              <p className="mt-2">
                For questions about these terms,
                exhibition participation or
                visitor registration, please
                contact the organising team
                through our{" "}
                <Link
                  href="/contact"
                  className="text-brand-red underline"
                >
                  Contact page
                </Link>
                .
              </p>
            </div>
 
          </div>
        </Container>
      </section>
    </>
  );
}
