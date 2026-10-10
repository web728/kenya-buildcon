
import "server-only";

import nodemailer, {
  type Transporter,
} from "nodemailer";

/* ==========================================
   ENVIRONMENT CONFIGURATION
========================================== */

const {
  MAIL_FROM_NAME = "Kenya Buildcon",
  MAIL_FROM_EMAIL,
  MAIL_USER,
  MAIL_APP_PASSWORD,
  MAIL_CLIENT_ID,
  MAIL_CLIENT_SECRET,
  MAIL_REFRESH_TOKEN,
} = process.env;

/* ==========================================
   TYPES
========================================== */

type MailAttachment = {
  filename: string;
  content: string;
  contentType?: string;
};

type SendMailOptions = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: MailAttachment[];
};

/* ==========================================
   EMAIL NORMALIZATION
========================================== */

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/* ==========================================
   GMAIL TRANSPORTER

   Priority:
   1. Gmail OAuth2
   2. Gmail App Password
========================================== */

let cachedTransporter:
  | Transporter
  | null
  | undefined;

export function getTransporter(): Transporter | null {
  if (cachedTransporter !== undefined) {
    return cachedTransporter;
  }

  if (!MAIL_USER) {
    cachedTransporter = null;
    return null;
  }

  // Gmail OAuth2
  if (
    MAIL_CLIENT_ID &&
    MAIL_CLIENT_SECRET &&
    MAIL_REFRESH_TOKEN
  ) {
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        type: "OAuth2",
        user: MAIL_USER,
        clientId: MAIL_CLIENT_ID,
        clientSecret: MAIL_CLIENT_SECRET,
        refreshToken: MAIL_REFRESH_TOKEN,
      },
    });

    return cachedTransporter;
  }

  // Gmail App Password
  if (MAIL_APP_PASSWORD) {
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: MAIL_USER,
        pass: MAIL_APP_PASSWORD,
      },
    });

    return cachedTransporter;
  }

  cachedTransporter = null;

  return null;
}

/* ==========================================
   EMAIL CONFIGURATION STATUS
========================================== */

export function isEmailConfigured(): boolean {
  return getTransporter() !== null;
}

/* ==========================================
   SENDER ADDRESS
========================================== */

export function getFromAddress(): string {
  const name = MAIL_FROM_NAME
    .replace(/[\r\n"]/g, "")
    .trim();

  const address =
    MAIL_FROM_EMAIL || MAIL_USER;

  if (!address) {
    throw new Error(
      "MAIL_FROM_EMAIL or MAIL_USER is required."
    );
  }

  return `"${name}" <${address}>`;
}

/* ==========================================
   ADMIN NOTIFICATION RECIPIENTS

   Uses existing environment variables:
   FORM_NOTIFICATION_EMAIL_1
   FORM_NOTIFICATION_EMAIL_2
========================================== */

export function getNotificationRecipients(): string[] {
  const configuredRecipients = [
    process.env.FORM_NOTIFICATION_EMAIL_1,
    process.env.FORM_NOTIFICATION_EMAIL_2,
  ];

  const recipients = configuredRecipients
    .filter(
      (email): email is string =>
        typeof email === "string" &&
        email.trim().length > 0
    )
    .map((email) => email.trim());

  // Remove duplicate email addresses.
  const uniqueRecipients = Array.from(
    new Map(
      recipients.map((email) => [
        normalizeEmail(email),
        email,
      ])
    ).values()
  );

  return uniqueRecipients;
}

/* ==========================================
   ACCEPTED RECIPIENT NORMALIZATION

   Nodemailer may return strings or
   address-like objects depending on
   transport/type definitions.

   TypeScript-safe implementation.
========================================== */

function getAcceptedEmails(
  acceptedResult: unknown
): Set<string> {
  const accepted = new Set<string>();

  if (!Array.isArray(acceptedResult)) {
    return accepted;
  }

  // Convert to unknown[] to narrow each value safely.
  const acceptedValues: unknown[] = acceptedResult;

  for (const recipient of acceptedValues) {
    if (typeof recipient === "string") {
      accepted.add(normalizeEmail(recipient));
      continue;
    }

    if (
      recipient !== null &&
      typeof recipient === "object" &&
      "address" in recipient
    ) {
      const address = Reflect.get(
        recipient,
        "address"
      );

      if (typeof address === "string") {
        accepted.add(normalizeEmail(address));
      }
    }
  }

  return accepted;
}

/* ==========================================
   SEND EMAIL

   Supports:
   - HTML email
   - Plain-text email
   - Downloadable text attachments

   Does not automatically send customer
   acknowledgement emails.
========================================== */

export async function sendMail({
  to,
  subject,
  html,
  text,
  attachments,
}: SendMailOptions): Promise<void> {
  const transporter = getTransporter();

  if (!transporter) {
    throw new Error(
      "Email service is not configured. Check Gmail environment variables."
    );
  }

  const recipients = (
    Array.isArray(to) ? to : [to]
  )
    .map((email) => email.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    throw new Error(
      "No email recipients specified."
    );
  }

  /* ========================================
     SEND THROUGH GMAIL
  ======================================== */

  const result = await transporter.sendMail({
    from: getFromAddress(),

    to: recipients,

    subject,

    html,

    ...(text
      ? {
          text,
        }
      : {}),

    ...(attachments && attachments.length > 0
      ? {
          attachments: attachments.map(
            (attachment) => ({
              filename: attachment.filename,
              content: attachment.content,

              contentType:
                attachment.contentType ||
                "text/plain; charset=utf-8",
            })
          ),
        }
      : {}),
  });

  /* ========================================
     CHECK ACCEPTED RECIPIENTS

     FIXED:
     No unsafe .toLowerCase()
     No unsafe .address access
     No implicit-any callback.
  ======================================== */

  const accepted = getAcceptedEmails(
    result.accepted
  );

  const missingRecipients = recipients.filter(
    (email) =>
      !accepted.has(normalizeEmail(email))
  );

  if (missingRecipients.length > 0) {
    throw new Error(
      `Email provider did not accept ${missingRecipients.length} recipient(s).`
    );
  }
}
