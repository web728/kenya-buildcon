import { z } from "zod";
import { phoneSchema, emailSchema, honeypotSchema, utmSchema, consentSchema } from "./shared";

export const brochureDownloadSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100),
  company: z.string().trim().min(1, "Enter your company name").max(150),
  country: z.string().trim().min(2, "Select a country").max(100),
  email: emailSchema,
  mobile: phoneSchema,

  consent: consentSchema,
  website_hp: honeypotSchema,
  startedAt: z.number().optional(),
  utm: utmSchema,
  landingPage: z.string().max(300).optional(),
});

export type BrochureDownloadInput = z.infer<typeof brochureDownloadSchema>;