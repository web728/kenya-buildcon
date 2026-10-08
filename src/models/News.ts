import { Schema, models, model, type InferSchemaType } from "mongoose";

const NewsSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    body: { type: String, required: true },
    featuredImageUrl: { type: String },
    category: {
      type: String,
      enum: ["Exhibitor News", "Show Updates", "Industry Updates", "Partner News"],
      required: true,
    },
    publishedAt: { type: Date, default: Date.now, index: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export type NewsDoc = InferSchemaType<typeof NewsSchema>;

export const News = models.News || model("News", NewsSchema);
