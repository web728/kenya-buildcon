import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { WhyKenyaClientView } from "@/components/about/WhyKenyaClientView";

export const metadata: Metadata = pageMetadata({
  title: "Why Kenya | Construction Market Opportunity",
  description: "Kenya's construction sector, Vision 2030 infrastructure and East African market access — why Nairobi is the place to exhibit at Kenya Buildcon 2027.",
  path: "/why-kenya",
});

export default function WhyKenyaPage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Kenya — East Africa's Construction Hub"
        intro="Government investment in infrastructure, a rapidly urbanising population and Vision 2030 flagship projects make Kenya a dynamic hub for construction in East Africa."
        image={{
          src: "/images/home/kenya-buildcon-inauguration.jpg",
          alt: "Industry leaders at the Kenya Buildcon inaugural ceremony, Nairobi",
        }}
      />

      <WhyKenyaClientView />
    </div>
  );
}