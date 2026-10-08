import { Schema, models, model, type InferSchemaType } from "mongoose";

const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor"], default: "admin" },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

export type AdminDoc = InferSchemaType<typeof AdminSchema>;

export const Admin = models.Admin || model("Admin", AdminSchema);
