"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { partnerEnquirySchema, type PartnerEnquiryInput } from "@/lib/validation/partnerEnquiry";
import { FieldWrapper, inputClasses, ReCaptchaField, isRecaptchaSatisfied } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";

export function PartnerEnquiryForm() {
  const [startedAt] = useState(() => Date.now());
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaAttempt, setRecaptchaAttempt] = useState(0);

  const { submit, status, referenceId, errorMessage } = useLeadSubmit("/api/partner-enquiry");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerEnquiryInput>({
    resolver: zodResolver(partnerEnquirySchema),
  });

  if (status === "success" && referenceId) {
    return (
      <SuccessPanel
        title="Partnership Enquiry Received"
        message="Thank you for your interest in partnering with Kenya Buildcon International Expo 2027. Our secretariat will review your enquiry and get in touch shortly."
        referenceId={referenceId}
        nextStep={{ label: "About the Expo", href: "/about" }}
      />
    );
  }

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const onSubmit = async (data: PartnerEnquiryInput) => {
    if (!isRecaptchaSatisfied(recaptchaToken)) return;

    const ok = await submit({
      ...data,
      recaptchaToken,
      startedAt,
      utm: getUtmFromLocation(),
      landingPage: window.location.pathname,
    });
    if (!ok) {
      setRecaptchaToken(null);
      setRecaptchaAttempt((n) => n + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {/* Honeypot Spam Guard */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="p-website_hp">Website</label>
        <input id="p-website_hp" type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="Organisation Name" htmlFor="organisation" required error={errors.organisation}>
          <input
            id="organisation"
            placeholder="e.g. Kenya National Chamber of Commerce"
            className={inputClasses(!!errors.organisation)}
            {...register("organisation")}
          />
        </FieldWrapper>

        <FieldWrapper label="Organisation Type" htmlFor="organisationType" required error={errors.organisationType}>
          <input
            id="organisationType"
            placeholder="e.g. Trade Association, Ministry, Media"
            className={inputClasses(!!errors.organisationType)}
            {...register("organisationType")}
          />
        </FieldWrapper>

        <FieldWrapper label="Country" htmlFor="country" required error={errors.country}>
          <select id="country" className={inputClasses(!!errors.country)} {...register("country")} defaultValue="">
            <option value="" disabled>Select base country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FieldWrapper>

        <FieldWrapper label="Website URL" htmlFor="website" error={errors.website}>
          <input
            id="website"
            placeholder="https://example.org"
            className={inputClasses(!!errors.website)}
            {...register("website")}
          />
        </FieldWrapper>

        <FieldWrapper label="Contact Person" htmlFor="contactPerson" required error={errors.contactPerson}>
          <input
            id="contactPerson"
            placeholder="Full Name"
            className={inputClasses(!!errors.contactPerson)}
            {...register("contactPerson")}
          />
        </FieldWrapper>

        <FieldWrapper label="Designation / Role" htmlFor="designation" error={errors.designation}>
          <input
            id="designation"
            placeholder="e.g. Secretary General, Director"
            className={inputClasses(!!errors.designation)}
            {...register("designation")}
          />
        </FieldWrapper>

        <FieldWrapper label="Corporate Email" htmlFor="email" required error={errors.email}>
          <input
            id="email"
            type="email"
            placeholder="partner@organisation.org"
            className={inputClasses(!!errors.email)}
            {...register("email")}
          />
        </FieldWrapper>

        <FieldWrapper label="Phone / Mobile" htmlFor="phone" required error={errors.phone}>
          <input
            id="phone"
            type="tel"
            placeholder="+254 / +91 ..."
            className={inputClasses(!!errors.phone)}
            {...register("phone")}
          />
        </FieldWrapper>

        <FieldWrapper label="Approximate Membership" htmlFor="approximateMembership" error={errors.approximateMembership}>
          <input
            id="approximateMembership"
            placeholder="e.g. 500+ Corporate Members"
            className={inputClasses()}
            {...register("approximateMembership")}
          />
        </FieldWrapper>

        <FieldWrapper label="Industry Sector Represented" htmlFor="industryRepresented" error={errors.industryRepresented}>
          <input
            id="industryRepresented"
            placeholder="e.g. Architecture, Civil Contractors"
            className={inputClasses()}
            {...register("industryRepresented")}
          />
        </FieldWrapper>

        <FieldWrapper label="Nature of Partnership" htmlFor="natureOfEnquiry" required error={errors.natureOfEnquiry} className="sm:col-span-2">
          <input
            id="natureOfEnquiry"
            placeholder="e.g. Trade Delegation Hosting, Media Coverage, Institutional Support"
            className={inputClasses(!!errors.natureOfEnquiry)}
            {...register("natureOfEnquiry")}
          />
        </FieldWrapper>

        <FieldWrapper label="Proposed Collaboration Message" htmlFor="message" error={errors.message} className="sm:col-span-2">
          <textarea
            id="message"
            rows={3}
            placeholder="Outline how your organisation would like to collaborate with Kenya Buildcon 2027..."
            className={inputClasses()}
            {...register("message")}
          />
        </FieldWrapper>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-red focus:ring-brand-red"
            {...register("consent")}
          />
          <span className="leading-relaxed text-xs sm:text-sm">
            I agree that Kenya Buildcon International Expo may contact me regarding this partnership enquiry, in line with the{" "}
            <a href="/privacy-policy" className="font-medium text-brand-red underline hover:text-brand-red-dark">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.consent && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.consent.message}</p>}
      </div>

      {/* reCAPTCHA v2 Checkbox Widget */}
      <div className="py-2">
        <ReCaptchaField key={recaptchaAttempt} onChange={handleRecaptchaChange} />
      </div>

      {status === "error" && errorMessage && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">
          {errorMessage}
        </p>
      )}

      <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
        <span className="text-[11px] text-slate-400 font-medium">
          Our team will review your enquiry and get back to you.
        </span>

        <button
          type="submit"
          disabled={status === "submitting" || !isRecaptchaSatisfied(recaptchaToken)}
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-brand-red px-7 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(200,38,45,0.25)] transition-all duration-300 hover:bg-brand-red-dark hover:shadow-[0_6px_22px_rgba(200,38,45,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === "submitting" ? "Submitting Application..." : "Submit Partnership Application →"}
        </button>
      </div>
    </form>
  );
}