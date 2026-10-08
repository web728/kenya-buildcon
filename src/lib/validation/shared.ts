import { z } from "zod";

// Loose but sane phone validation: digits, spaces, +, -, () — 7 to 20 chars.
export const phoneSchema = z
  .string()
  .trim()
  .min(7, "Enter a valid mobile / WhatsApp number")
  .max(20, "Enter a valid mobile / WhatsApp number")
  .regex(/^[0-9+\-()\s]+$/, "Enter a valid mobile / WhatsApp number");

export const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email address").max(200);

export const websiteSchema = z
  .string()
  .trim()
  .max(200)
  .optional()
  .or(z.literal(""))
  .refine((val) => !val || /^https?:\/\/|^www\./i.test(val), {
    message: "Enter a valid website URL",
  });

// Honeypot: accepted by validation so routes can silently discard bot submissions
// (a validation error here would tell bots which field to leave empty).
export const honeypotSchema = z.string().max(500).optional();

export const utmSchema = z
  .object({
    source: z.string().max(100).optional(),
    medium: z.string().max(100).optional(),
    campaign: z.string().max(100).optional(),
  })
  .optional();

export const consentSchema = z.literal(true, "Please confirm you agree before submitting");

export const MIN_SUBMIT_MS = 1500;
