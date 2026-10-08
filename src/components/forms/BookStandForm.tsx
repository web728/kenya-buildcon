"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  exhibitorEnquirySchema,
  type ExhibitorEnquiryInput,
  companyTypeOptions,
  participationOptions,
  areaOptions,
  yesNoOptions,
  yesNoMaybeOptions,
} from "@/lib/validation/exhibitorEnquiry";
import { FieldWrapper, inputClasses, ReCaptchaField, isRecaptchaSatisfied } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";
import { exhibitionSectors } from "@/data/exhibitionProfile";

export function BookStandForm() {
  const [startedAt] = useState(() => Date.now());
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaAttempt, setRecaptchaAttempt] = useState(0);

  const { submit, status, referenceId, errorMessage } = useLeadSubmit("/api/exhibitor-enquiry");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ExhibitorEnquiryInput>({
    resolver: zodResolver(exhibitorEnquirySchema),
    defaultValues: {
      preferredParticipation: participationOptions[0],
      requiredArea: areaOptions[0],
    },
  });

  const selectedParticipation = useWatch({ control, name: "preferredParticipation" });
  const selectedArea = useWatch({ control, name: "requiredArea" });

  if (status === "success" && referenceId) {
    return (
      <SuccessPanel
        title="Exhibitor Enquiry Received"
        message="Thank you for your interest in exhibiting at Kenya Buildcon International Expo 2027. Our exhibition sales team will contact you shortly with participation details."
        referenceId={referenceId}
        nextStep={{ label: "Download the Brochure", href: "/downloads" }}
      />
    );
  }

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const onSubmit = async (data: ExhibitorEnquiryInput) => {
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
      {/* Honeypot field for bot protection */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Website</label>
        <input id="website_hp" type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
      </div>

      {/* SECTION 1: COMPANY INFORMATION */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-red/10 text-xs font-bold text-brand-red">
            01
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Company Information
          </h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="Company Name" htmlFor="companyName" required error={errors.companyName}>
            <input 
              id="companyName" 
              placeholder="e.g. Acme Construction Ltd" 
              className={inputClasses(!!errors.companyName)} 
              {...register("companyName")} 
            />
          </FieldWrapper>

          <FieldWrapper label="Country" htmlFor="country" required error={errors.country}>
            <select id="country" className={inputClasses(!!errors.country)} {...register("country")} defaultValue="">
              <option value="" disabled>Select country</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper label="City" htmlFor="city" error={errors.city}>
            <input id="city" placeholder="e.g. Nairobi" className={inputClasses(!!errors.city)} {...register("city")} />
          </FieldWrapper>

          <FieldWrapper label="Company Website" htmlFor="website" error={errors.website}>
            <input id="website" placeholder="https://example.com" className={inputClasses(!!errors.website)} {...register("website")} />
          </FieldWrapper>

          <FieldWrapper label="Company Type" htmlFor="companyType" required error={errors.companyType} className="sm:col-span-2">
            <select id="companyType" className={inputClasses(!!errors.companyType)} {...register("companyType")} defaultValue="">
              <option value="" disabled>Select company type</option>
              {companyTypeOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </FieldWrapper>
        </div>
      </section>

      {/* SECTION 2: CONTACT DETAILS */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-red/10 text-xs font-bold text-brand-red">
            02
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Primary Contact Person
          </h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="First Name" htmlFor="firstName" required error={errors.firstName}>
            <input id="firstName" placeholder="John" className={inputClasses(!!errors.firstName)} {...register("firstName")} />
          </FieldWrapper>

          <FieldWrapper label="Last Name" htmlFor="lastName" required error={errors.lastName}>
            <input id="lastName" placeholder="Doe" className={inputClasses(!!errors.lastName)} {...register("lastName")} />
          </FieldWrapper>

          <FieldWrapper label="Designation / Job Title" htmlFor="designation" required error={errors.designation}>
            <input id="designation" placeholder="e.g. Sales Director" className={inputClasses(!!errors.designation)} {...register("designation")} />
          </FieldWrapper>

          <FieldWrapper label="Business Email" htmlFor="email" required error={errors.email}>
            <input id="email" type="email" placeholder="john@company.com" className={inputClasses(!!errors.email)} {...register("email")} />
          </FieldWrapper>

          <FieldWrapper label="Mobile / WhatsApp Number" htmlFor="mobile" required error={errors.mobile} className="sm:col-span-2">
            <input id="mobile" type="tel" placeholder="+254 7XX XXX XXX" className={inputClasses(!!errors.mobile)} {...register("mobile")} />
          </FieldWrapper>
        </div>
      </section>

      {/* SECTION 3: EXHIBITION REQUIREMENT */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-red/10 text-xs font-bold text-brand-red">
            03
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Stand & Exhibition Preferences
          </h3>
        </div>

        <div className="grid gap-6">
          {/* Sector Selection */}
          <FieldWrapper label="Product Category / Sector" htmlFor="productCategory" required error={errors.productCategory}>
            <select id="productCategory" className={inputClasses(!!errors.productCategory)} {...register("productCategory")} defaultValue="">
              <option value="" disabled>Select sector category</option>
              {exhibitionSectors.map((s) => (
                <option key={s.slug} value={s.name}>{s.name}</option>
              ))}
            </select>
          </FieldWrapper>

          {/* Interactive Participation Options Visual Card Selector */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Preferred Participation Type <span className="text-red-500">*</span>
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {participationOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setValue("preferredParticipation", option, { shouldValidate: true })}
                  className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                    selectedParticipation === option
                      ? "border-brand-red bg-brand-red/5 ring-2 ring-brand-red/20"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm font-semibold text-slate-900">{option}</span>
                  <span className="mt-1 text-xs text-slate-500">
                    {option.includes("Shell") 
                      ? "Includes pre-built booth, lighting, table & chairs" 
                      : "Custom build space (min 18 sqm)"}
                  </span>
                </button>
              ))}
            </div>
            {errors.preferredParticipation && (
              <p className="mt-1.5 text-xs text-red-600">{errors.preferredParticipation.message}</p>
            )}
          </div>

          {/* Area Options Pill Selector */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Required Area Space <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {areaOptions.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => setValue("requiredArea", area, { shouldValidate: true })}
                  className={`rounded-lg border px-4 py-2.5 text-xs font-medium transition-all ${
                    selectedArea === area
                      ? "border-brand-red bg-brand-red text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
            {errors.requiredArea && (
              <p className="mt-1.5 text-xs text-red-600">{errors.requiredArea.message}</p>
            )}
          </div>

          <FieldWrapper label="Key Products / Services to Display" htmlFor="productsServices" required error={errors.productsServices}>
            <textarea 
              id="productsServices" 
              rows={3} 
              placeholder="Briefly describe what products or machinery you will display..." 
              className={inputClasses(!!errors.productsServices)} 
              {...register("productsServices")} 
            />
          </FieldWrapper>

          {/* Business Intent Questions */}
          <div className="grid gap-5 rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:grid-cols-2 sm:p-5">
            <FieldWrapper label="Existing business in Kenya?" htmlFor="existingBusinessInKenya" error={errors.existingBusinessInKenya}>
              <select id="existingBusinessInKenya" className={inputClasses()} {...register("existingBusinessInKenya")} defaultValue="">
                <option value="">Select option</option>
                {yesNoOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </FieldWrapper>

            <FieldWrapper label="Looking for local distributors?" htmlFor="lookingForDistributor" error={errors.lookingForDistributor}>
              <select id="lookingForDistributor" className={inputClasses()} {...register("lookingForDistributor")} defaultValue="">
                <option value="">Select option</option>
                {yesNoMaybeOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </FieldWrapper>
          </div>

          <FieldWrapper label="Additional Messages / Custom Requirements" htmlFor="message" error={errors.message}>
            <textarea 
              id="message" 
              rows={3} 
              placeholder="Any specific location preference, height requirement, or questions..." 
              className={inputClasses()} 
              {...register("message")} 
            />
          </FieldWrapper>
        </div>
      </section>

      {/* SECTION 4: CONSENT, RECAPTCHA & SUBMISSION */}
      <div className="space-y-6 pt-4">
        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input 
            type="checkbox" 
            className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-red focus:ring-brand-red" 
            {...register("consent")} 
          />
          <span className="leading-relaxed">
            I agree that Kenya Buildcon International Expo may contact me regarding my exhibitor enquiry in accordance with the{" "}
            <a href="/privacy-policy" className="font-medium text-brand-red underline hover:text-brand-red/80">
              Privacy Policy
            </a>.
          </span>
        </label>
        {errors.consent && (
          <p className="text-xs font-medium text-red-600">{errors.consent.message}</p>
        )}

        {/* reCAPTCHA v2 Checkbox Widget */}
        <div className="py-2">
          <ReCaptchaField key={recaptchaAttempt} onChange={handleRecaptchaChange} />
        </div>

        {status === "error" && errorMessage && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting" || !isRecaptchaSatisfied(recaptchaToken)}
          className="inline-flex w-full items-center justify-center rounded-xl bg-brand-red px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? (
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting Application...
            </span>
          ) : (
            "Submit Exhibitor Application"
          )}
        </button>
      </div>
    </form>
  );
}