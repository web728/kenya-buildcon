// Creates (or updates) the initial admin user from ADMIN_INITIAL_EMAIL /
// ADMIN_INITIAL_PASSWORD. Run with: npm run seed:admin
// Requires MONGODB_URI, ADMIN_INITIAL_EMAIL and ADMIN_INITIAL_PASSWORD to be
// set (e.g. via `node --env-file=.env.local scripts/seed-admin.mjs`).

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { MONGODB_URI, MONGODB_DB, ADMIN_INITIAL_EMAIL, ADMIN_INITIAL_PASSWORD } = process.env;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set.");
  process.exit(1);
}
if (!ADMIN_INITIAL_EMAIL || !ADMIN_INITIAL_PASSWORD) {
  console.error("ADMIN_INITIAL_EMAIL and ADMIN_INITIAL_PASSWORD must both be set.");
  process.exit(1);
}
if (ADMIN_INITIAL_PASSWORD.length < 10) {
  console.error("ADMIN_INITIAL_PASSWORD must be at least 10 characters.");
  process.exit(1);
}

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor"], default: "admin" },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

async function main() {
  await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB || "kenya_buildcon" });
  const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

  const email = ADMIN_INITIAL_EMAIL.toLowerCase().trim();
  const passwordHash = await bcrypt.hash(ADMIN_INITIAL_PASSWORD, 12);

  const existing = await Admin.findOne({ email });
  if (existing) {
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log(`Updated password for existing admin: ${email}`);
  } else {
    await Admin.create({ email, passwordHash, name: "Administrator", role: "admin" });
    console.log(`Created admin user: ${email}`);
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
