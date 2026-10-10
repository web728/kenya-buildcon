
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  brochureDownloadSchema,
  type BrochureDownloadInput,
} from "@/lib/validation/brochureDownload";

import {
  FieldWrapper,
  inputClasses,
  ReCaptchaField,
  isRecaptchaSatisfied,
} from "./fields";

import {
  useLeadSubmit,
  getUtmFromLocation,
} from "@/hooks/useLeadSubmit";

import { countries } from "@/data/countries";

const BROCHURE_FILE_URL =
  "/downloads/Kenya-Buildcon-Expo-Brochure-2027.pdf";

const BROCHURE_FILE_NAME =
  "Kenya-Buildcon-Expo-Brochure-2027.pdf";

const FIELD_STYLE =
  "w-full min-h-[46px] rounded-md border border-[#111111]/[0.12] bg-white px-4 py-3 text-[13px] font-medium text-[#111111] outline-none transition-[border-color,box-shadow] duration-200 placeholder:font-normal placeholder:text-[#AAAAAA] hover:border-[#111111]/25 focus:border-[#BE202B] focus:ring-2 focus:ring-[#BE202B]/10 disabled:cursor-not-allowed disabled:opacity-60";

function fieldClass(hasError: boolean) {
  return [
    inputClasses(hasError),
    FIELD_STYLE,
    hasError
      ? "!border-[#BE202B]"
      : "",
  ].join(" ");
}

function DownloadIcon() {
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
      <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" />
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

export function BrochureDownloadForm() {
  const reducedMotion = useReducedMotion();

  const [startedAt] = useState(() => Date.now());

  const [recaptchaToken, setRecaptchaToken] =
    useState<string | null>(null);

  const [recaptchaAttempt, setRecaptchaAttempt] =
    useState(0);

  const [captchaError, setCaptchaError] =
    useState(false);

  const downloadLinkRef =
    useRef<HTMLAnchorElement>(null);

  const downloadTriggeredRef = useRef(false);

  const {
    submit,
    status,
    referenceId,
    errorMessage,
  } = useLeadSubmit("/api/brochure-download");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<BrochureDownloadInput>({
    resolver: zodResolver(brochureDownloadSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const isSuccess =
    status === "success" && Boolean(referenceId);

  const isSubmittingNow =
    status === "submitting" || isSubmitting;

  const captchaReady =
    isRecaptchaSatisfied(recaptchaToken);

  /* ========================================
     DOWNLOAD AFTER SUCCESSFUL API SUBMISSION
  ======================================== */

  useEffect(() => {
    if (
      !isSuccess ||
      downloadTriggeredRef.current
    ) {
      return;
    }

    downloadTriggeredRef.current = true;

    downloadLinkRef.current?.click();
  }, [isSuccess]);

  /* ========================================
     RECAPTCHA
  ======================================== */

  const handleRecaptchaChange = (
    token: string | null
  ) => {
    setRecaptchaToken(token);

    if (isRecaptchaSatisfied(token)) {
      setCaptchaError(false);
    }
  };

  /* ========================================
     FORM SUBMISSION
  ======================================== */

  const onSubmit = async (
    data: BrochureDownloadInput
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

  /* ========================================
     SUCCESS STATE
  ======================================== */

  if (isSuccess) {
    return (
      <motion.div
        role="status"
        initial={
          reducedMotion
            ? false
            : { opacity: 0, y: 12 }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: reducedMotion ? 0 : 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="mx-auto max-w-[600px] py-8 text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-[#25B34B]/10 text-[#1D9440]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        </div>

        <h3 className="mt-5 text-[clamp(1.65rem,3vw,2.2rem)] font-extrabold tracking-[-0.04em] text-[#111111]">
          Thank You.
        </h3>

        <p className="mt-3 text-[13px] leading-[1.8] text-[#666666]">
          Your brochure request has been received.
          Your download should start automatically.
          You can also use the link below to
          download the official exhibition brochure.
        </p>

        <a
          href={BROCHURE_FILE_URL}
          download={BROCHURE_FILE_NAME}
          className="mt-6 inline-flex min-h-[46px] items-center justify-center gap-3 rounded-md bg-[#BE202B] px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#A51B25]"
        >
          <DownloadIcon />
          Download Brochure
        </a>

        <a
          ref={downloadLinkRef}
          href={BROCHURE_FILE_URL}
          download={BROCHURE_FILE_NAME}
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
        >
          Download PDF
        </a>

        <p className="mt-4 text-[11px] text-[#888888]">
          Kenya Buildcon International Expo 2027
        </p>
      </motion.div>
    );
  }

  /* ========================================
     FORM
  ======================================== */

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : { opacity: 0, y: 10 }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full"
    >
      <div className="mb-7 border-b border-[#111111]/10 pb-5">
        <div className="flex items-center gap-2.5">
          <span className="h-[2px] w-7 bg-[#BE202B]" />

          <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#BE202B]">
            Brochure Access
          </span>
        </div>

        <h3 className="mt-3 text-[clamp(1.45rem,2.4vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.035em] text-[#111111]">
          Your Details.
          <span className="text-[#BE202B]">
            {" "}Your Brochure.
          </span>
        </h3>

        <p className="mt-2 text-[12px] leading-[1.8] text-[#777777] sm:text-[13px]">
          Enter your details below to request
          the official Kenya Buildcon 2027 PDF.
          Required fields are marked with an
          asterisk.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Exhibition brochure download request"
        className="flex flex-col gap-6"
      >
        {/* HONEYPOT */}
        <div
          className="hidden"
          aria-hidden="true"
        >
          <label htmlFor="b-website_hp">
            Website
          </label>

          <input
            id="b-website_hp"
            type="text"
            autoComplete="off"
            tabIndex={-1}
            {...register("website_hp")}
          />
        </div>

        {/* FORM FIELDS */}
        <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
          <FieldWrapper
            label="Full Name"
            htmlFor="b-name"
            required
            error={errors.name}
          >
            <input
              id="b-name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              aria-invalid={!!errors.name}
              className={fieldClass(!!errors.name)}
              {...register("name")}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Company / Organisation"
            htmlFor="b-company"
            required
            error={errors.company}
          >
            <input
              id="b-company"
              type="text"
              autoComplete="organization"
              placeholder="Company or organisation"
              aria-invalid={!!errors.company}
              className={fieldClass(!!errors.company)}
              {...register("company")}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Email Address"
            htmlFor="b-email"
            required
            error={errors.email}
          >
            <input
              id="b-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="name@company.com"
              aria-invalid={!!errors.email}
              className={fieldClass(!!errors.email)}
              {...register("email")}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Mobile / WhatsApp"
            htmlFor="b-mobile"
            required
            error={errors.mobile}
          >
            <input
              id="b-mobile"
              type="tel"
              autoComplete="tel"
              placeholder="+254 7XX XXX XXX"
              aria-invalid={!!errors.mobile}
              className={fieldClass(!!errors.mobile)}
              {...register("mobile")}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Country"
            htmlFor="b-country"
            required
            error={errors.country}
            className="sm:col-span-2"
          >
            <select
              id="b-country"
              autoComplete="country-name"
              defaultValue=""
              aria-invalid={!!errors.country}
              className={fieldClass(!!errors.country)}
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
        </div>

        {/* PRIVACY CONSENT */}
        <div className="rounded-md border border-[#111111]/10 bg-[#F8F8F8] p-4 sm:p-5">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              aria-invalid={!!errors.consent}
              className="mt-0.5 h-[17px] w-[17px] shrink-0 cursor-pointer rounded border-[#111111]/25 accent-[#BE202B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE202B]"
              {...register("consent")}
            />

            <span className="text-[12px] leading-[1.8] text-[#666666]">
              I agree that{" "}
              <strong className="font-bold text-[#111111]">
                Kenya Buildcon International Expo
              </strong>{" "}
              may contact me regarding my brochure
              request, in line with the{" "}
              <Link
                href="/privacy-policy"
                className="font-bold text-[#BE202B] underline underline-offset-2 hover:text-[#111111]"
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

        {/* SECURITY CHECK */}
        <div className="border-t border-[#111111]/10 pt-5">
          <p className="text-[12px] font-extrabold text-[#111111]">
            Security Verification
          </p>

          <p className="mt-1 text-[11px] leading-[1.7] text-[#888888]">
            Complete the verification before
            downloading the brochure.
          </p>

          <div className="mt-4 max-w-full overflow-hidden">
            <div className="origin-top-left scale-[0.85] sm:scale-100">
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
            className="rounded-md border border-[#BE202B]/20 bg-[#BE202B]/[0.045] px-4 py-3"
          >
            <p className="text-[12px] font-semibold leading-[1.7] text-[#A51B25]">
              {errorMessage}
            </p>
          </div>
        )}

        {/* SUBMIT */}
        <div className="flex flex-col gap-4 border-t border-[#111111]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[360px] text-[11px] leading-[1.75] text-[#888888]">
            Your details will be used to process
            your brochure request in accordance
            with the Privacy Policy.
          </p>

          <motion.button
            type="submit"
            disabled={
              isSubmittingNow || !captchaReady
            }
            whileHover={
              reducedMotion ||
              isSubmittingNow ||
              !captchaReady
                ? undefined
                : { y: -2 }
            }
            whileTap={
              reducedMotion ||
              isSubmittingNow ||
              !captchaReady
                ? undefined
                : { scale: 0.985 }
            }
            transition={{
              duration: 0.2,
            }}
            className="inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-3 rounded-md bg-[#BE202B] px-6 py-3.5 text-[12px] font-extrabold uppercase tracking-[0.045em] text-white shadow-[0_5px_16px_rgba(190,32,43,0.12)] outline-none transition-[background-color,box-shadow] duration-200 hover:bg-[#A51B25] hover:shadow-[0_8px_22px_rgba(190,32,43,0.18)] focus-visible:ring-2 focus-visible:ring-[#BE202B] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:w-auto"
          >
            {isSubmittingNow ? (
              <>
                <SpinnerIcon />
                Submitting...
              </>
            ) : (
              <>
                <DownloadIcon />
                Download Brochure
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
