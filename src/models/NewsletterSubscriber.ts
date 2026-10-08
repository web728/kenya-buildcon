import { Schema, models, model, type InferSchemaType } from "mongoose";

const NewsletterSubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    country: { type: String },
    interest: { type: [String], default: [] },
    utm: {
      source: String,
      medium: String,
      campaign: String,
    },
    landingPage: { type: String },
    sheetsSyncStatus: { type: String, enum: ["pending", "synced", "failed"], default: "pending" },
  },
  { timestamps: true },
);

export type NewsletterSubscriberDoc = InferSchemaType<typeof NewsletterSubscriberSchema>;

export const NewsletterSubscriber =
  models.NewsletterSubscriber || model("NewsletterSubscriber", NewsletterSubscriberSchema);
