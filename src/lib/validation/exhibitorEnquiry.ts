import { z } from "zod";
import { phoneSchema, emailSchema, websiteSchema, honeypotSchema, utmSchema, consentSchema } from "./shared";

export const companyTypeOptions = [
  "Manufacturer",
  "Exporter",
  "Importer",
  "Distributor",
  "Supplier",
  "Service Provider",
  "Other",
] as const;

export const participationOptions = ["Shell Scheme", "Raw Space", "Group Participation", "Not Decided"] as const;

export const areaOptions = ["9 sqm", "12 sqm", "18 sqm", "24 sqm", "36 sqm", "48 sqm+", "Not Decided"] as const;

export const yesNoOptions = ["Yes", "No"] as const;
export const yesNoMaybeOptions = ["Yes", "No", "Possibly"] as const;

export const exhibitorEnquirySchema = z.object({
  companyName: z.string().trim().min(2, "Enter your company name").max(150),
  country: z.string().trim().min(2, "Select a country").max(100),
  city: z.string().trim().max(100).optional(),
  website: websiteSchema,
  companyType: z.enum(companyTypeOptions, "Select a company type"),

  firstName: z.string().trim().min(1, "Enter your first name").max(80),
  lastName: z.string().trim().min(1, "Enter your last name").max(80),
  designation: z.string().trim().min(1, "Enter your designation").max(100),
  email: emailSchema,
  mobile: phoneSchema,

  productCategory: z.string().trim().min(1, "Select a product category").max(150),
  productsServices: z.string().trim().min(2, "Describe your products or services").max(1000),
  preferredParticipation: z.enum(participationOptions, "Select a participation type"),
  requiredArea: z.enum(areaOptions, "Select a required area"),
  // These render as <select> elements whose unselected state is "" (the
  // placeholder option), not undefined — z.enum(...).optional() alone
  // rejects "" since it isn't a member of the enum, so "" must be accepted
  // here too. Normalized to undefined at the API boundary before saving
  // (not via .transform() here, which would desync the zodResolver's
  // input/output types for react-hook-form).
  existingBusinessInKenya: z.enum(yesNoOptions).optional().or(z.literal("")),
  lookingForDistributor: z.enum(yesNoMaybeOptions).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional(),

  consent: consentSchema,
  website_hp: honeypotSchema,
  startedAt: z.number().optional(),
  utm: utmSchema,
  landingPage: z.string().max(300).optional(),
});

export type ExhibitorEnquiryInput = z.infer<typeof exhibitorEnquirySchema>;
