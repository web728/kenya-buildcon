import { z } from "zod";
import { phoneSchema, emailSchema, honeypotSchema, utmSchema, consentSchema } from "./shared";

export const purchasingResponsibilityOptions = [
  "Final Decision Maker",
  "Recommend / Specify",
  "Procurement Team",
  "End User",
  "Other",
] as const;

export const purposeOfVisitOptions = [
  "Source Products",
  "Meet Suppliers",
  "Find New Brands",
  "Project Procurement",
  "Explore Dealership Opportunities",
  "Attend Seminars & Workshops",
  "Business Networking",
  "Other",
] as const;

export const natureOfBusinessOptions = [
  "Contractor",
  "Developer / Project Owner",
  "Architect / Engineer / Consultant",
  "Importer / Distributor / Trade Buyer",
  "Procurement Professional",
  "Industrial / Institutional Buyer",
  "Government Agency / Building Authority",
  "Interior Designer",
  "Hospitality / Facility Management",
  "Homeowner / Property Investor",
  "Academic / Researcher / Student",
  "Other",
] as const;

export const visitorRegistrationSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(80),
  lastName: z.string().trim().min(1, "Enter your last name").max(80),
  designation: z.string().trim().min(1, "Enter your designation").max(100),
  company: z.string().trim().min(1, "Enter your company name").max(150),
  country: z.string().trim().min(2, "Select a country").max(100),
  city: z.string().trim().min(1, "Enter your city").max(100),
  email: emailSchema,
  mobile: phoneSchema,

  natureOfBusiness: z.enum(natureOfBusinessOptions, "Select the nature of your business"),
  productsInterested: z.array(z.string().max(150)).min(1, "Select at least one product interest").max(15),
  purchasingResponsibility: z.enum(purchasingResponsibilityOptions, "Select your purchasing responsibility"),
  purposeOfVisit: z.enum(purposeOfVisitOptions, "Select your purpose of visit"),

  consent: consentSchema,
  website_hp: honeypotSchema,
  startedAt: z.number().optional(),
  utm: utmSchema,
  landingPage: z.string().max(300).optional(),
});

export type VisitorRegistrationInput = z.infer<typeof visitorRegistrationSchema>;
