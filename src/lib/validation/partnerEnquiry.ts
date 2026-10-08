import { z } from "zod";
import { phoneSchema, emailSchema, websiteSchema, honeypotSchema, utmSchema, consentSchema } from "./shared";

export const partnerEnquirySchema = z.object({
  organisation: z.string().trim().min(2, "Enter your organisation name").max(150),
  organisationType: z.string().trim().min(2, "Enter your organisation type").max(150),
  country: z.string().trim().min(2, "Select a country").max(100),
  website: websiteSchema,
  contactPerson: z.string().trim().min(1, "Enter a contact person").max(100),
  designation: z.string().trim().max(100).optional(),
  email: emailSchema,
  phone: phoneSchema,
  approximateMembership: z.string().trim().max(100).optional(),
  industryRepresented: z.string().trim().max(200).optional(),
  natureOfEnquiry: z.string().trim().min(2, "Describe the nature of your enquiry").max(200),
  message: z.string().trim().max(2000).optional(),

  consent: consentSchema,
  website_hp: honeypotSchema,
  startedAt: z.number().optional(),
  utm: utmSchema,
  landingPage: z.string().max(300).optional(),
});

export type PartnerEnquiryInput = z.infer<typeof partnerEnquirySchema>;
