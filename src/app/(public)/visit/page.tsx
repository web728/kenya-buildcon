import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { VisitClientView } from "@/components/visit/VisitClientView";

export const metadata: Metadata = pageMetadata({
  title: "Why Visit | Free Trade Visitor Registration",
  description:
    "Visit Kenya Buildcon 2027 free: explore building and construction products, meet suppliers and attend seminars at The Sarit Expo Centre, Nairobi.",
  path: "/visit",
});

export default function VisitPage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Gain Insights. Discover Innovations. Explore Solutions."
        intro="Explore a wide range of products, services and innovations in architecture, building, construction, design and engineering — all under one roof in Nairobi."
        image={{
          src: "/images/sectors/trade-visitors.jpg",
          alt: "Trade visitors exploring exhibitor stands at Kenya Buildcon",
        }}
      />

      <VisitClientView />
    </div>
  );
}