import { Schema, models, model, type InferSchemaType } from "mongoose";

const ExhibitorSchema = new Schema(
  {
    companyName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    logoUrl: { type: String },
    country: { type: String, required: true },
    standNumber: { type: String },
    category: { type: String, required: true, index: true },
    shortDescription: { type: String },
    products: [{ type: String }],
    website: { type: String },
    socialUrl: { type: String },
    brochureUrl: { type: String },
    published: { type: Boolean, default: false, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type ExhibitorDoc = InferSchemaType<typeof ExhibitorSchema>;

export const Exhibitor = models.Exhibitor || model("Exhibitor", ExhibitorSchema);
