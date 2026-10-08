import type { FieldError } from "react-hook-form";
import { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { clsx } from "@/lib/utils/clsx";

const INPUT_CLASSES =
  "w-full rounded-md border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-dark placeholder:text-brand-body/50 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red disabled:opacity-60";

export function FieldWrapper({
  label,
  htmlFor,
  required,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: FieldError;
  className?: string;
  children: React.ReactNode;
}) {
  const errorId = `${htmlFor}-error`;
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-brand-dark">
        {label}
        {required ? <span className="text-brand-red"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 opacity-100 text-xs font-medium text-red-600 transition-opacity duration-150 ease-out starting:opacity-0"
        >
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

export const inputClasses = (hasError?: boolean) =>
  clsx(INPUT_CLASSES, hasError && "border-red-400 focus:border-red-500 focus:ring-red-500");

/**
 * reCAPTCHA v2 is enabled only when a site key is configured for this domain.
 * Without it the widget is skipped and the server falls back to the honeypot +
 * minimum-time checks (the server enforces reCAPTCHA whenever its secret is set).
 */
export const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

/** True when the form may be submitted as far as reCAPTCHA is concerned. */
export const isRecaptchaSatisfied = (token: string | null) => !recaptchaSiteKey || Boolean(token);

// Standardized ReCAPTCHA Field Component
export const ReCaptchaField = forwardRef<ReCAPTCHA, { onChange: (token: string | null) => void; className?: string }>(
  ({ onChange, className }, ref) => {
    if (!recaptchaSiteKey) return null;

    return (
      <div className={clsx("py-2", className)}>
        <ReCAPTCHA ref={ref} sitekey={recaptchaSiteKey} onChange={onChange} onExpired={() => onChange(null)} />
      </div>
    );
  }
);

ReCaptchaField.displayName = "ReCaptchaField";