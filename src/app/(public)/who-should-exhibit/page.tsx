import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldExhibitClientView } from "@/components/exhibit/WhoShouldExhibitClientView";

export const metadata: Metadata = pageMetadata({
  title: "Who Should Exhibit",
  description:
    "Who should exhibit at Kenya Buildcon 2027: building materials, machinery, engineering, interiors, green building and construction technology companies.",
  path: "/who-should-exhibit",
});

export default function WhoShouldExhibitPage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Who Should Exhibit at Kenya Buildcon"
        intro="Companies specializing in building materials, engineering services, heavy machinery, architectural and interior design, green building solutions and advanced infrastructure technology."
        image={{
          src: "/images/sectors/product-display.jpg",
          alt: "Products on display at a Kenya Buildcon exhibitor stand",
        }}
      />

      <WhoShouldExhibitClientView />
    </div>
  );
}