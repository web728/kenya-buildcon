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
 

    <div>
      <h2 className="text-lg font-bold text-brand-dark">
        Information We Collect
      </h2>

      <p className="mt-2">
        When you contact us, register as a visitor,
        enquire about exhibition space, request
        event information or subscribe to updates,
        we may collect details such as your name,
        company name, job title, country, email
        address, phone number and enquiry details.
      </p>

      <p className="mt-2">
        We may also collect basic technical
        information, including IP addresses,
        browser details and website usage data,
        to help maintain website security,
        prevent spam and understand website
        performance.
      </p>
    </div>

    <div>
      <h2 className="text-lg font-bold text-brand-dark">
        How We Use Your Information
      </h2>

      <p className="mt-2">
        We use personal information for
        purposes related to the exhibition,
        including:
      </p>

      <ul className="mt-2 list-disc space-y-2 pl-5">
        <li>
          Responding to enquiries and requests
          for information.
        </li>
        <li>
          Processing exhibitor enquiries and
          visitor registrations.
        </li>
        <li>
          Sending registration confirmations
          and important event updates.
        </li>
        <li>
          Managing exhibition participation
          and related arrangements.
        </li>
        <li>
          Improving website performance
          and maintaining internal records.
        </li>
        <li>
          Sending promotional updates where
          permitted by applicable law.
        </li>
      </ul>
    </div>

    <div>
      <h2 className="text-lg font-bold text-brand-dark">
        Data Storage & Sharing
      </h2>

      <p className="mt-2">
        Personal information submitted through
        our website may be stored in our
        databases and authorised systems used
        for exhibition management.
      </p>

      <p className="mt-2">
        We may share information between the
        organising companies and with service
        providers who help manage registrations,
        communications, website operations and
        exhibition arrangements.
      </p>

      <p className="mt-2">
        Information may be accessed or processed
        outside Kenya where required for
        exhibition operations, subject to
        applicable data protection requirements.
      </p>

      <p className="mt-2">
        We do not sell personal information
        to third parties.
      </p>
    </div>

    <div>
      <h2 className="text-lg font-bold text-brand-dark">
        Data Security & Retention
      </h2>

      <p className="mt-2">
        We take reasonable steps to protect
        personal information against
        unauthorised access, misuse, loss
        or disclosure.
      </p>

      <p className="mt-2">
        We retain personal information only
        for as long as necessary for the
        purposes described in this policy,
        including applicable legal and
        operational requirements.
      </p>
    </div>

    <div>
      <h2 className="text-lg font-bold text-brand-dark">
        Cookies & Website Analytics
      </h2>

      <p className="mt-2">
        Our website may use cookies and
        similar technologies to support
        essential functionality, understand
        website usage and improve the
        visitor experience.
      </p>

      <p className="mt-2">
        Where required, we will request
        consent before using optional
        analytics or marketing cookies.
        For more information, please
        read our{" "}
        <a
          href="/cookie-policy"
          className="text-brand-red underline"
        >
          Cookie Policy
        </a>.
      </p>
    </div>

    <div>
      <h2 className="text-lg font-bold text-brand-dark">
        Your Privacy Rights
      </h2>

      <p className="mt-2">
        Under applicable data protection laws,
        including Kenya's Data Protection Act,
        2019, you may have the right to:
      </p>

      <ul className="mt-2 list-disc space-y-2 pl-5">
        <li>
          Request access to your personal information.
        </li>
        <li>
          Request correction of inaccurate information.
        </li>
        <li>
          Request deletion of personal information
          where applicable.
        </li>
        <li>
          Object to certain uses of your information.
        </li>
        <li>
          Withdraw consent where processing
          is based on consent.
        </li>
      </ul>

      <p className="mt-2">
        To make a privacy-related request,
        please contact us through our{" "}
        <a
          href="/contact"
          className="text-brand-red underline"
        >
          Contact page
        </a>.
      </p>
    </div>

    <div>
      <h2 className="text-lg font-bold text-brand-dark">
        Marketing Communications
      </h2>

      <p className="mt-2">
        If you have agreed to receive
        promotional updates, we may contact
        you about exhibition news, participation
        opportunities and related events.
      </p>

      <p className="mt-2">
        You can request to stop receiving
        promotional communications at any
        time by contacting the organising team
        or using the unsubscribe option,
        where provided.
      </p>
    </div>

    <div>
      <h2 className="text-lg font-bold text-brand-dark">
        Changes to This Policy
      </h2>

      <p className="mt-2">
        We may update this Privacy Policy
        to reflect changes in our website,
        event operations or legal requirements.
        Any updates will be published on
        this page.
      </p>
    </div>

    <div>
      <h2 className="text-lg font-bold text-brand-dark">
        Contact Us
      </h2>

      <p className="mt-2">
        For questions about this Privacy Policy
        or the handling of your personal
        information, please contact the
        organising team through our{" "}
        <a
          href="/contact"
          className="text-brand-red underline"
        >
          Contact page
        </a>.
      </p>
    </div>

  
  </div>
</Container>

      </section>
    </>
  );
}
