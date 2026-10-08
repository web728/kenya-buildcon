import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { OrganisersClientView } from "@/components/about/OrganisersClientView";

export const metadata: Metadata = pageMetadata({
  title: "Official Event Organisers | Futurex & ETSIPL",
  description:
    "Kenya Buildcon International Expo 2027 is jointly organised by Futurex Trade Fair & Events and Exhibitions & Trade Services India (ETSIPL).",
  path: "/organisers",
});

export default function OrganisersPage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Jointly Organised By"
        intro="Brought together by international exhibition leaders with proven expertise across Asia and East Africa, delivering high-impact B2B trade platforms for the building and infrastructure industry."
        image={{
          src: "/images/home/kenya-buildcon-inauguration.jpg",
          alt: "Organisers and dignitaries at the Kenya Buildcon inaugural ceremony",
        }}
      />

      <OrganisersClientView />
    </div>
  );
}