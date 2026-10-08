import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ContactClientView } from "@/components/sections/ContactClientView";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us | Exhibition Enquiries & Support",
  description:
    "Contact the Kenya Buildcon 2027 team for stand bookings, sponsorship, partnerships, international participation and visitor enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Let’s Connect & Build Together"
        intro="Reach the Kenya Buildcon organising team for stand bookings, partnerships, sponsorships, international participation, and visitor enquiries."
        image={{
          src: "/images/home/kenya-buildcon-exhibition-hall.jpg",
          alt: "Exhibitor stands at Kenya Buildcon, The Sarit Expo Centre, Nairobi",
        }}
      />

      <ContactClientView />
    </div>
  );
}