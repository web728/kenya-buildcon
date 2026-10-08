import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { BookStandForm } from "@/components/forms/BookStandForm";

export const metadata: Metadata = pageMetadata({
  title: "Book a Stand",
  description:
    "Book your exhibition stand at Kenya Buildcon International Expo 2027, 9–11 June, The Sarit Expo Centre, Nairobi. Get space, pricing and floor plan details.",
  path: "/book-a-stand",
});

export default function BookAStandPage() {
  return (
    <>
      <PageHero
        title="Reserve Your Exhibition Stand"
        intro={event.brandLines.exhibitor}
      />

      <section className="bg-slate-50/50 py-12 sm:py-20 lg:py-24">
        <Container className="max-w-3xl">
          {/* Centered Form Container */}
          <div className="mx-auto rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
            <div className="mb-8 border-b border-slate-100 pb-6 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Exhibitor Application
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Fill out the form below to receive detailed space availability, booth pricing, and customized floor plans.
              </p>
            </div>

            <BookStandForm />
          </div>
        </Container>
      </section>
    </>
  );
}