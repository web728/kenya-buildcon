import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldVisitClientView } from "@/components/visit/WhoShouldVisitClientView";

export const metadata: Metadata = pageMetadata({
  title: "Who Should Visit",
  description:
    "Kenya Buildcon 2027 is for architects, engineers, contractors, developers, importers and government agencies. Visitor registration is free.",
  path: "/who-should-visit",
});

export default function WhoShouldVisitPage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="The People Who Buy, Build, Specify & Source"
        intro="Builders, developers, architects, engineers, project managers, government representatives and trade buyers seeking the latest innovations."
        image={{
          src: "/images/sectors/trade-visitors.jpg",
          alt: "Trade visitors at a Kenya Buildcon exhibitor stand",
        }}
      />

      <WhoShouldVisitClientView />
    </div>
  );
}