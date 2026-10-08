import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { AboutClientView } from "@/components/about/AboutClientView";

export const metadata: Metadata = pageMetadata({
  title: "About the Expo",
  description:
    "Kenya Buildcon International Expo 2027 — Kenya's premier trade exhibition for building and construction, 9–11 June 2027 at The Sarit Expo Centre, Nairobi.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Building the Future, Together"
        intro="The foremost international trade exhibition in Kenya dedicated to the building and construction industry — where professionals, businesses and stakeholders explore the latest trends, innovations and opportunities."
        image={{
          src: "/images/home/kenya-buildcon-inauguration.jpg",
          alt: "Inaugural ceremony of a previous Kenya Buildcon International Expo in Nairobi",
        }}
      />

      <AboutClientView />
    </div>
  );
}