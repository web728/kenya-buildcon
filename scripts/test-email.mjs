// Sends a single test email using the configured transporter to verify
// email credentials. Run with: npm run test:email -- you@example.com

import nodemailer from "nodemailer";

const {
  MAIL_FROM_NAME = "Kenya Buildcon",
  MAIL_FROM_EMAIL,
  MAIL_USER,
  MAIL_APP_PASSWORD,
  MAIL_CLIENT_ID,
  MAIL_CLIENT_SECRET,
  MAIL_REFRESH_TOKEN,
} = process.env;

const to = process.argv[2];
if (!to) {
  console.error("Usage: npm run test:email -- you@example.com");
  process.exit(1);
}
if (!MAIL_USER) {
  console.error("MAIL_USER is not set.");
  process.exit(1);
}

let transporter;
if (MAIL_CLIENT_ID && MAIL_CLIENT_SECRET && MAIL_REFRESH_TOKEN) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { type: "OAuth2", user: MAIL_USER, clientId: MAIL_CLIENT_ID, clientSecret: MAIL_CLIENT_SECRET, refreshToken: MAIL_REFRESH_TOKEN },
  });
} else if (MAIL_APP_PASSWORD) {
  transporter = nodemailer.createTransport({ service: "gmail", auth: { user: MAIL_USER, pass: MAIL_APP_PASSWORD } });
} else {
  console.error("Neither OAuth2 (MAIL_CLIENT_ID/SECRET/REFRESH_TOKEN) nor MAIL_APP_PASSWORD is configured.");
  process.exit(1);
}

const info = await transporter.sendMail({
  from: `"${MAIL_FROM_NAME}" <${MAIL_FROM_EMAIL || MAIL_USER}>`,
  to,
  subject: "Kenya Buildcon — Test Email",
  html: "<p>This is a test email confirming your Kenya Buildcon mail configuration is working.</p>",
});

console.log("Sent:", info.messageId);
