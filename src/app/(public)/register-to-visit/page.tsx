import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { VisitorRegistrationForm } from "@/components/forms/VisitorRegistrationForm";

export const metadata: Metadata = pageMetadata({
  title: "Register to Visit",
  description:
    "Register free to visit Kenya Buildcon International Expo 2027, 9–11 June at The Sarit Expo Centre, Nairobi, and get your visitor pass.",
  path: "/register-to-visit",
});

export default function RegisterToVisitPage() {
  return (
    <>
      <PageHero 
        title="Visitor Registration" 
        intro={event.brandLines.visitor} 
      />

      <section className="bg-slate-50/50 py-12 sm:py-20 lg:py-24">
        <Container className="max-w-3xl">
          {/* Centered Main Form Container */}
          <div className="mx-auto rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
            <div className="mb-8 border-b border-slate-100 pb-6 text-center">
              <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Free Trade Pass
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Get Your Visitor Access Badge
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Visitor registration is free. Register below to secure your spot and receive updates on the event schedule, exhibitors and special events.
              </p>
            </div>

            <VisitorRegistrationForm />
          </div>
        </Container>
      </section>
    </>
  );
}