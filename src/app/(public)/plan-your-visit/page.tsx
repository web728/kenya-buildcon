import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { PlanYourVisitClientView } from "@/components/visit/PlanYourVisitClientView";

export const metadata: Metadata = pageMetadata({
  title: "Plan Your Visit | Nairobi",
  description:
    "Plan your visit to Kenya Buildcon 2027: dates, opening hours, venue directions, travel tips and FAQs for The Sarit Expo Centre, Nairobi.",
  path: "/plan-your-visit",
});

export default function PlanYourVisitPage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Plan Your Visit to Nairobi"
        intro="Practical visitor information, venue access, opening hours and travel essentials for Kenya Buildcon International Expo 2027."
        image={{
          src: "/images/home/kenya-buildcon-exhibition-hall.jpg",
          alt: "Exhibition hall at The Sarit Expo Centre, Nairobi",
        }}
      />

      <PlanYourVisitClientView />
    </div>
  );
}