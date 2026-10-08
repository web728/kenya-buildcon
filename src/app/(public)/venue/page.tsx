import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { VenueClientView } from "@/components/about/VenueClientView";

export const metadata: Metadata = pageMetadata({
  title: "Venue & Location | The Sarit Expo Centre, Nairobi",
  description:
    "The Sarit Expo Centre, Nairobi hosts Kenya Buildcon 2027 on 9–11 June, open 10:00 am – 6:00 pm daily. Venue location, directions and visitor access.",
  path: "/venue",
});

export default function VenuePage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] selection:bg-brand-red selection:text-white">
      <PageHero
        title="Official Exhibition Venue"
        intro={`${event.venue.name} · ${event.venue.city}, ${event.venue.country} · ${event.dates.display}`}
        image={{
          src: "/images/home/kenya-buildcon-exhibition-hall.jpg",
          alt: `Exhibition hall at ${event.venue.name}, ${event.venue.city}`,
        }}
      />

      <VenueClientView/>
    </div>
  );
}