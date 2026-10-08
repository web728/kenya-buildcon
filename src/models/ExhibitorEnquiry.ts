import { Schema, models, model, type InferSchemaType } from "mongoose";

const ExhibitorEnquirySchema = new Schema(
  {
    referenceId: { type: String, required: true, unique: true, index: true },

    companyName: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String },
    website: { type: String },
    companyType: { type: String, required: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    designation: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    mobile: { type: String, required: true },

    productCategory: { type: String, required: true },
    productsServices: { type: String, required: true },
    preferredParticipation: { type: String, required: true },
    requiredArea: { type: String, required: true },
    existingBusinessInKenya: { type: String },
    lookingForDistributor: { type: String },
    message: { type: String },

    utm: {
      source: String,
      medium: String,
      campaign: String,
    },
    landingPage: { type: String },
    userAgent: { type: String },

    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Follow-Up", "Confirmed", "Closed", "Invalid"],
      default: "New",
    },
    notes: [{ text: String, createdAt: { type: Date, default: Date.now } }],

    sheetsSyncStatus: { type: String, enum: ["pending", "synced", "failed"], default: "pending" },
    emailStatus: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
  },
  { timestamps: true },
);

export type ExhibitorEnquiryDoc = InferSchemaType<typeof ExhibitorEnquirySchema>;

export const ExhibitorEnquiry =
  models.ExhibitorEnquiry || model("ExhibitorEnquiry", ExhibitorEnquirySchema);
