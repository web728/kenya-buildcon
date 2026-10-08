import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitClientView } from "@/components/exhibit/ExhibitClientView";

export const metadata: Metadata = pageMetadata({
  title: "Why Exhibit | Book Your Stand in Nairobi",
  description:
    "Book a stand at Kenya Buildcon 2027 and showcase your products to builders, developers, architects, contractors and government buyers in Nairobi.",
  path: "/exhibit",
});

export default function ExhibitPage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Connect with the East African Construction Market"
        intro="Three business days in Nairobi to generate leads, gain market insights, showcase innovation and build brand visibility with Kenya's construction decision-makers."
        image={{
          src: "/images/sectors/exhibitor-stand.jpg",
          alt: "Visitors meeting an exhibitor at a Kenya Buildcon stand",
        }}
      />

      <ExhibitClientView />
    </div>
  );
}