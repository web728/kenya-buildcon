import { z } from "zod";
import { phoneSchema, emailSchema, honeypotSchema, utmSchema, consentSchema } from "./shared";

export const contactInterestOptions = [
  "Exhibiting",
  "Visiting",
  "Association / Partner",
  "Sponsorship",
  "Media",
  "General Enquiry",
] as const;

export const contactEnquirySchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100),
  company: z.string().trim().min(1, "Enter your company name").max(150),
  designation: z.string().trim().max(100).optional(),
  country: z.string().trim().min(2, "Select a country").max(100),
  email: emailSchema,
  mobile: phoneSchema,
  interest: z.enum(contactInterestOptions, "Select an option"),
  message: z.string().trim().min(2, "Enter a message").max(2000),

  consent: consentSchema,
  website_hp: honeypotSchema,
  startedAt: z.number().optional(),
  utm: utmSchema,
  landingPage: z.string().max(300).optional(),
});

export type ContactEnquiryInput = z.infer<typeof contactEnquirySchema>;
