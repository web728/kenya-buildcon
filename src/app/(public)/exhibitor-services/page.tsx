import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitorServicesClientView } from "@/components/exhibit/ExhibitorServicesClientView";

export const metadata: Metadata = pageMetadata({
  title: "Exhibitor Services & Logistics",
  description:
    "Exhibitor services for Kenya Buildcon 2027 — invitation letters, stand options, freight logistics and on-site support at The Sarit Expo Centre, Nairobi.",
  path: "/exhibitor-services",
});

export default function ExhibitorServicesPage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Exhibitor Services & Logistics"
        intro="Operational guidance and logistics support for a seamless exhibition experience at The Sarit Expo Centre, Nairobi."
        image={{
          src: "/images/sectors/engineer-blueprint.jpg",
          alt: "Engineer reviewing technical exhibition specifications",
        }}
      />

      <ExhibitorServicesClientView />
    </div>
  );
}