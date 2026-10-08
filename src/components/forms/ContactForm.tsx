"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  contactEnquirySchema,
  type ContactEnquiryInput,
  contactInterestOptions,
} from "@/lib/validation/contactEnquiry";
import { FieldWrapper, inputClasses, ReCaptchaField, isRecaptchaSatisfied } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";

export function ContactForm({
  defaultInterest,
}: {
  defaultInterest?: (typeof contactInterestOptions)[number];
}) {
  const [startedAt] = useState(() => Date.now());
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaAttempt, setRecaptchaAttempt] = useState(0);

  const { submit, status, referenceId, errorMessage } = useLeadSubmit("/api/contact");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactEnquiryInput>({
    resolver: zodResolver(contactEnquirySchema),
    defaultValues: defaultInterest ? { interest: defaultInterest } : undefined,
  });

  if (status === "success" && referenceId) {
    return (
      <SuccessPanel
        title="Enquiry Received"
        message="Thank you for contacting Kenya Buildcon International Expo. Our team will respond to your enquiry shortly."
        referenceId={referenceId}
      />
    );
  }

  const onSubmit = async (data: ContactEnquiryInput) => {
    // 1. ReCAPTCHA Validation Check
    if (!isRecaptchaSatisfied(recaptchaToken)) return;

    // 2. Submit Payload with token
    const ok = await submit({
      ...data,
      recaptchaToken, // Route API handling token
      startedAt,
      utm: getUtmFromLocation(),
      landingPage: window.location.pathname,
    });
    if (!ok) {
      setRecaptchaToken(null);
      setRecaptchaAttempt((n) => n + 1);
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-100/50 sm:p-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        {/* Honeypot Field for Spam Prevention */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="c-website_hp">Website</label>
          <input
            id="c-website_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website_hp")}
          />
        </div>

        {/* Inputs Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="Full Name" htmlFor="name" required error={errors.name}>
            <input
              id="name"
              placeholder="e.g. John Doe"
              className={inputClasses(!!errors.name)}
              {...register("name")}
            />
          </FieldWrapper>

          <FieldWrapper label="Company / Organisation" htmlFor="company" required error={errors.company}>
            <input
              id="company"
              placeholder="e.g. Acme Corp"
              className={inputClasses(!!errors.company)}
              {...register("company")}
            />
          </FieldWrapper>

          <FieldWrapper label="Country" htmlFor="country" required error={errors.country}>
            <select
              id="country"
              className={inputClasses(!!errors.country)}
              {...register("country")}
              defaultValue=""
            >
              <option value="" disabled>
                Select your country
              </option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper label="Email" htmlFor="email" required error={errors.email}>
            <input
              id="email"
              type="email"
              placeholder="john@company.com"
              className={inputClasses(!!errors.email)}
              {...register("email")}
            />
          </FieldWrapper>

          <FieldWrapper label="Mobile / WhatsApp" htmlFor="mobile" required error={errors.mobile}>
            <input
              id="mobile"
              type="tel"
              placeholder="+254 7XX XXX XXX"
              className={inputClasses(!!errors.mobile)}
              {...register("mobile")}
            />
          </FieldWrapper>

          <FieldWrapper label="Area of Interest" htmlFor="interest" required error={errors.interest}>
            <select
              id="interest"
              className={inputClasses(!!errors.interest)}
              {...register("interest")}
              defaultValue={defaultInterest ?? ""}
            >
              <option value="" disabled>
                Select interest area
              </option>
              {contactInterestOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper
            label="Your Message"
            htmlFor="message"
            required
            error={errors.message}
            className="sm:col-span-2"
          >
            <textarea
              id="message"
              rows={4}
              placeholder="How can we help you?"
              className={inputClasses(!!errors.message)}
              {...register("message")}
            />
          </FieldWrapper>
        </div>

        {/* Consent Checkbox */}
        <div className="rounded-lg bg-gray-50/70 p-4 border border-gray-100">
          <label className="flex items-start gap-3 text-sm text-brand-body cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-gray-300 text-brand-red focus:ring-brand-red"
              {...register("consent")}
            />
            <span className="text-xs text-gray-600 leading-relaxed">
              I agree that <strong>Kenya Buildcon International Expo</strong> may contact me regarding my enquiry,
              in line with the{" "}
              <a href="/privacy-policy" className="font-medium text-brand-red underline hover:text-brand-red-dark">
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {errors.consent && (
            <p className="mt-2 text-xs font-medium text-red-600">{errors.consent.message}</p>
          )}
        </div>

       {/* UI Widget reCAPTCHA Container */}
<div className="my-2 overflow-hidden">
  <div className="w-full origin-top-left scale-[0.85] xs:scale-[0.9] sm:scale-100">
    <ReCaptchaField key={recaptchaAttempt} onChange={handleRecaptchaChange} />
  </div>
</div>

        {/* Error Alert */}
        {status === "error" && errorMessage && (
          <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-100">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "submitting" || !isRecaptchaSatisfied(recaptchaToken)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-red/20 transition-all duration-200 hover:bg-brand-red-dark hover:shadow-xl active:scale-[0.98] disabled:opacity-50 sm:w-auto self-start"
        >
          {status === "submitting" ? (
            <>
              <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Submitting…</span>
            </>
          ) : (
            <span>Send Message</span>
          )}
        </button>
      </form>
    </div>
  );
}