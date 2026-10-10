
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  contactEnquirySchema,
  type ContactEnquiryInput,
  contactInterestOptions,
} from "@/lib/validation/contactEnquiry";

import {
  FieldWrapper,
  inputClasses,
  ReCaptchaField,
  isRecaptchaSatisfied,
} from "./fields";

import { SuccessPanel } from "./SuccessPanel";

import {
  useLeadSubmit,
  getUtmFromLocation,
} from "@/hooks/useLeadSubmit";

import { countries } from "@/data/countries";

/* ==========================================
   SHARED STYLES
========================================== */

const FIELD_STYLE =
  "w-full min-h-[46px] rounded-md border border-[#111111]/[0.12] bg-white px-4 py-3 text-[13px] font-medium text-[#111111] outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:font-normal placeholder:text-[#AAAAAA] hover:border-[#111111]/25 focus:border-[#BE202B] focus:ring-2 focus:ring-[#BE202B]/10 disabled:cursor-not-allowed disabled:opacity-60";

const SELECT_STYLE =
  `${FIELD_STYLE} cursor-pointer appearance-auto`;

const TEXTAREA_STYLE =
  `${FIELD_STYLE} min-h-[136px] resize-y leading-[1.7]`;

function fieldClass(
  hasError: boolean,
  variant: "input" | "select" | "textarea" = "input"
) {
  const base =
    variant === "select"
      ? SELECT_STYLE
      : variant === "textarea"
        ? TEXTAREA_STYLE
        : FIELD_STYLE;

  return [
    inputClasses(hasError),
    base,
    hasError
      ? "!border-[#BE202B] !focus:ring-[#BE202B]/10"
      : "",
  ].join(" ");
}

/* ==========================================
   ICONS
========================================== */

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-4 w-4 animate-spin"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        strokeOpacity="0.25"
      />

      <path d="M12 3a9 9 0 0 1 9 9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

/* ==========================================
   MAIN CONTACT FORM
========================================== */

export function ContactForm({
  defaultInterest,
}: {
  defaultInterest?: (typeof contactInterestOptions)[number];
}) {
  const reducedMotion = useReducedMotion();

  const [startedAt] = useState(() => Date.now());

  const [recaptchaToken, setRecaptchaToken] =
    useState<string | null>(null);

  const [recaptchaAttempt, setRecaptchaAttempt] =
    useState(0);

  const [captchaError, setCaptchaError] =
    useState(false);

  const {
    submit,
    status,
    referenceId,
    errorMessage,
  } = useLeadSubmit("/api/contact");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ContactEnquiryInput>({
    resolver: zodResolver(contactEnquirySchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: defaultInterest
      ? {
          interest: defaultInterest,
        }
      : undefined,
  });

  /* ========================================
     SUBMISSION
  ======================================== */

  const onSubmit = async (
    data: ContactEnquiryInput
  ) => {
    if (!isRecaptchaSatisfied(recaptchaToken)) {
      setCaptchaError(true);
      return;
    }

    setCaptchaError(false);

    const ok = await submit({
      ...data,
      recaptchaToken,
      startedAt,
      utm: getUtmFromLocation(),
      landingPage: window.location.pathname,
    });

    if (!ok) {
      setRecaptchaToken(null);
      setRecaptchaAttempt((current) => current + 1);
    }
  };

  const handleRecaptchaChange = (
    token: string | null
  ) => {
    setRecaptchaToken(token);

    if (isRecaptchaSatisfied(token)) {
      setCaptchaError(false);
    }
  };

  /* ========================================
     SUCCESS STATE
  ======================================== */

  if (status === "success" && referenceId) {
    return (
      <SuccessPanel
        title="Enquiry Received"
        message="Thank you for contacting Kenya Buildcon International Expo. Our team will respond to your enquiry shortly."
        referenceId={referenceId}
      />
    );
  }

  const submitting =
    status === "submitting" || isSubmitting;

  const captchaReady =
    isRecaptchaSatisfied(recaptchaToken);

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 10,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Kenya Buildcon contact enquiry form"
        className="flex flex-col gap-7"
      >
        {/* SPAM PROTECTION */}
        <div
          className="hidden"
          aria-hidden="true"
        >
          <label htmlFor="c-website_hp">
            Website
          </label>

          <input
            id="c-website_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website_hp")}
          />
        </div>

        {/* CONTACT DETAILS */}
        <div>
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#111111]/10 pb-4">
            <div>
              <h3 className="text-[14px] font-extrabold tracking-[-0.015em] text-[#111111]">
                Your Contact Details
              </h3>

              <p className="mt-1 text-[11px] leading-[1.6] text-[#888888]">
                Please provide accurate details
                so our team can respond.
              </p>
            </div>

            <span
              aria-hidden="true"
              className="h-[2px] w-8 shrink-0 bg-[#25B34B]"
            />
          </div>

          <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
            <FieldWrapper
              label="Full Name"
              htmlFor="name"
              required
              error={errors.name}
            >
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                className={fieldClass(!!errors.name)}
                aria-invalid={!!errors.name}
                {...register("name")}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Company / Organisation"
              htmlFor="company"
              required
              error={errors.company}
            >
              <input
                id="company"
                type="text"
                autoComplete="organization"
                placeholder="Company or organisation"
                className={fieldClass(!!errors.company)}
                aria-invalid={!!errors.company}
                {...register("company")}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Email Address"
              htmlFor="email"
              required
              error={errors.email}
            >
              <input
                id="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="name@company.com"
                className={fieldClass(!!errors.email)}
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Mobile / WhatsApp"
              htmlFor="mobile"
              required
              error={errors.mobile}
            >
              <input
                id="mobile"
                type="tel"
                autoComplete="tel"
                placeholder="+254 7XX XXX XXX"
                className={fieldClass(!!errors.mobile)}
                aria-invalid={!!errors.mobile}
                {...register("mobile")}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Country"
              htmlFor="country"
              required
              error={errors.country}
            >
              <select
                id="country"
                autoComplete="country-name"
                className={fieldClass(
                  !!errors.country,
                  "select"
                )}
                aria-invalid={!!errors.country}
                defaultValue=""
                {...register("country")}
              >
                <option value="" disabled>
                  Select your country
                </option>

                {countries.map((country) => (
                  <option
                    key={country}
                    value={country}
                  >
                    {country}
                  </option>
                ))}
              </select>
            </FieldWrapper>

            <FieldWrapper
              label="Area of Interest"
              htmlFor="interest"
              required
              error={errors.interest}
            >
              <select
                id="interest"
                className={fieldClass(
                  !!errors.interest,
                  "select"
                )}
                aria-invalid={!!errors.interest}
                defaultValue={defaultInterest ?? ""}
                {...register("interest")}
              >
                <option value="" disabled>
                  Select interest area
                </option>

                {contactInterestOptions.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </FieldWrapper>
          </div>
        </div>

        {/* MESSAGE */}
        <div>
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#111111]/10 pb-4">
            <div>
              <h3 className="text-[14px] font-extrabold tracking-[-0.015em] text-[#111111]">
                Your Enquiry
              </h3>

              <p className="mt-1 text-[11px] leading-[1.6] text-[#888888]">
                Tell us what you would like
                assistance with.
              </p>
            </div>

            <span
              aria-hidden="true"
              className="h-[2px] w-8 shrink-0 bg-[#BE202B]"
            />
          </div>

          <FieldWrapper
            label="Your Message"
            htmlFor="message"
            required
            error={errors.message}
          >
            <textarea
              id="message"
              rows={5}
              placeholder="Please share your enquiry, requirements or questions..."
              className={fieldClass(
                !!errors.message,
                "textarea"
              )}
              aria-invalid={!!errors.message}
              {...register("message")}
            />
          </FieldWrapper>
        </div>

        {/* CONSENT */}
        <div className="rounded-md border border-[#111111]/10 bg-[#F8F8F8] px-4 py-4 sm:px-5">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-0.5 h-[17px] w-[17px] shrink-0 cursor-pointer rounded border-[#111111]/25 accent-[#BE202B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE202B]"
              aria-invalid={!!errors.consent}
              {...register("consent")}
            />

            <span className="text-[12px] leading-[1.8] text-[#666666]">
              I agree that{" "}
              <strong className="font-bold text-[#111111]">
                Kenya Buildcon International Expo
              </strong>{" "}
              may contact me regarding my
              enquiry, in accordance with the{" "}
              <Link
                href="/privacy-policy"
                className="font-bold text-[#BE202B] underline underline-offset-2 transition-colors hover:text-[#111111]"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {errors.consent && (
            <p
              role="alert"
              className="mt-2 pl-[29px] text-[11px] font-semibold text-[#BE202B]"
            >
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* RECAPTCHA */}
        <div className="border-t border-[#111111]/10 pt-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#25B34B]/[0.08] text-[#1D9440]">
              <CheckIcon />
            </span>

            <div>
              <p className="text-[12px] font-extrabold text-[#111111]">
                Security Verification
              </p>

              <p className="mt-0.5 text-[11px] text-[#888888]">
                Complete verification before
                submitting your enquiry.
              </p>
            </div>
          </div>

          <div className="max-w-full overflow-hidden">
            <div className="w-full origin-top-left scale-[0.85] sm:scale-100">
              <ReCaptchaField
                key={recaptchaAttempt}
                onChange={handleRecaptchaChange}
              />
            </div>
          </div>

          {captchaError && (
            <p
              role="alert"
              className="mt-2 text-[11px] font-semibold text-[#BE202B]"
            >
              Please complete the security
              verification.
            </p>
          )}
        </div>

        {/* API ERROR */}
        {status === "error" && errorMessage && (
          <div
            role="alert"
            className="rounded-md border border-[#BE202B]/20 bg-[#BE202B]/[0.045] px-4 py-3.5"
          >
            <p className="text-[12px] font-semibold leading-[1.7] text-[#A51B25]">
              {errorMessage}
            </p>
          </div>
        )}

        {/* SUBMIT */}
        <div className="flex flex-col gap-4 border-t border-[#111111]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[360px] text-[11px] leading-[1.75] text-[#888888]">
            Your information will be used
            to process your enquiry and
            communicate with you.
          </p>

          <motion.button
            type="submit"
            disabled={
              submitting || !captchaReady
            }
            whileHover={
              reducedMotion || submitting || !captchaReady
                ? undefined
                : { y: -2 }
            }
            whileTap={
              reducedMotion || submitting || !captchaReady
                ? undefined
                : { scale: 0.985 }
            }
            transition={{
              duration: 0.2,
            }}
            className="group inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-3 rounded-md bg-[#BE202B] px-7 py-3.5 text-[12px] font-extrabold uppercase tracking-[0.055em] text-white shadow-[0_5px_16px_rgba(190,32,43,0.12)] outline-none transition-[background-color,box-shadow] duration-200 hover:bg-[#A51B25] hover:shadow-[0_8px_22px_rgba(190,32,43,0.18)] focus-visible:ring-2 focus-visible:ring-[#BE202B] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:w-auto"
          >
            {submitting ? (
              <>
                <SpinnerIcon />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Send Enquiry</span>

                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <SendIcon />
                </span>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
