import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ExhibitionProfileExplorer } from "@/components/exhibit/ExhibitionProfileExplorer";

export const metadata: Metadata = pageMetadata({
  title: "Exhibition Profile | 50+ Product Categories",
  description:
    "Kenya Buildcon 2027 exhibitor profile: 50+ categories from cement, steel and machinery to interiors, MEP, solar energy and construction technology.",
  path: "/exhibition-profile",
});

export default function ExhibitionProfilePage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Products, Machinery & Materials"
        intro="Fifteen sector groups and 50+ product categories from the official exhibitor profile, covering the complete building and infrastructure supply chain."
        image={{
          src: "/images/sectors/product-display.jpg",
          alt: "Bathroom fittings on display at a Kenya Buildcon exhibitor stand",
        }}
      />

      <section className="relative py-16 lg:py-24 border-t border-slate-200/80">
        <Container>
          <ExhibitionProfileExplorer />
        </Container>
      </section>
    </div>
  );
}