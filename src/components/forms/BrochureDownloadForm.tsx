"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { brochureDownloadSchema, type BrochureDownloadInput } from "@/lib/validation/brochureDownload";
import { FieldWrapper, inputClasses, ReCaptchaField, isRecaptchaSatisfied } from "./fields";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";

const BROCHURE_FILE_URL = "/downloads/Kenya-Buildcon-Expo-Brochure-2027.pdf";
const BROCHURE_FILE_NAME = "Kenya-Buildcon-Expo-Brochure-2027.pdf";

export function BrochureDownloadForm() {
  const [startedAt] = useState(() => Date.now());
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaAttempt, setRecaptchaAttempt] = useState(0);

  const { submit, status, referenceId, errorMessage } = useLeadSubmit("/api/brochure-download");
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BrochureDownloadInput>({
    resolver: zodResolver(brochureDownloadSchema),
  });

  // Auto-trigger the download once the lead is saved successfully.
  useEffect(() => {
    if (status === "success" && referenceId) {
      downloadLinkRef.current?.click();
    }
  }, [status, referenceId]);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const onSubmit = async (data: BrochureDownloadInput) => {
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

  if (status === "success" && referenceId) {
    return (
      <div className="rounded-xl border border-brand-border bg-brand-light p-8 text-center">
        <p className="text-lg font-bold text-brand-dark">Thank you!</p>
        <p className="mt-1.5 text-sm text-brand-body">
          Your download should start automatically. If it doesn&apos;t,{" "}
          <a href={BROCHURE_FILE_URL} download={BROCHURE_FILE_NAME} className="font-semibold text-brand-red underline">
            click here
          </a>.
        </p>
        {/* Hidden auto-download trigger */}
        <a ref={downloadLinkRef} href={BROCHURE_FILE_URL} download={BROCHURE_FILE_NAME} className="hidden" aria-hidden="true">
          download
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="b-website_hp">Website</label>
        <input id="b-website_hp" type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrapper label="Name" htmlFor="b-name" required error={errors.name}>
          <input id="b-name" className={inputClasses(!!errors.name)} {...register("name")} />
        </FieldWrapper>
        <FieldWrapper label="Company" htmlFor="b-company" required error={errors.company}>
          <input id="b-company" className={inputClasses(!!errors.company)} {...register("company")} />
        </FieldWrapper>
        <FieldWrapper label="Country" htmlFor="b-country" required error={errors.country}>
          <select id="b-country" className={inputClasses(!!errors.country)} {...register("country")} defaultValue="">
            <option value="" disabled>Select country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FieldWrapper>
        <FieldWrapper label="Email" htmlFor="b-email" required error={errors.email}>
          <input id="b-email" type="email" className={inputClasses(!!errors.email)} {...register("email")} />
        </FieldWrapper>
        <FieldWrapper label="Mobile / WhatsApp" htmlFor="b-mobile" required error={errors.mobile} className="sm:col-span-2">
          <input id="b-mobile" type="tel" placeholder="+254 7XX XXX XXX" className={inputClasses(!!errors.mobile)} {...register("mobile")} />
        </FieldWrapper>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-brand-body">
          <input type="checkbox" className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-brand-border" {...register("consent")} />
          <span>
            I agree that Kenya Buildcon International Expo may contact me regarding my enquiry,
            in line with the <a href="/privacy-policy" className="underline hover:text-brand-red">Privacy Policy</a>.
          </span>
        </label>
        {errors.consent ? <p className="mt-1.5 opacity-100 text-xs font-medium text-red-600 transition-opacity duration-150 ease-out starting:opacity-0">{errors.consent.message}</p> : null}
      </div>

      {/* reCAPTCHA v2 Checkbox Widget */}
      <div className="py-1">
        <ReCaptchaField key={recaptchaAttempt} onChange={handleRecaptchaChange} />
      </div>

      {status === "error" && errorMessage ? (
        <p role="alert" className="translate-y-0 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 opacity-100 transition-[transform,opacity] duration-200 ease-out starting:translate-y-1 starting:opacity-0">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting" || !isRecaptchaSatisfied(recaptchaToken)}
        className="inline-flex w-full items-center justify-center rounded-md bg-brand-red px-7 py-3.5 text-base font-semibold uppercase tracking-wide text-white transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] disabled:active:scale-100 hover:bg-brand-red-dark disabled:opacity-50 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Download Brochure"}
      </button>
    </form>
  );
}