import { NextResponse } from "next/server";

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

/** True when server-side reCAPTCHA enforcement is enabled. */
export function isRecaptchaEnforced(): boolean {
  return Boolean(process.env.RECAPTCHA_SECRET_KEY);
}

/** Verifies a reCAPTCHA v2 token with Google. Fails closed on network errors. */
export async function verifyRecaptcha(token: string, remoteIp?: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true;

  const params = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") params.set("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
      signal: AbortSignal.timeout(8000),
    });
    const result = (await res.json()) as { success?: boolean };
    return result.success === true;
  } catch (err) {
    console.error("reCAPTCHA verification request failed:", err instanceof Error ? err.message : err);
    return false;
  }
}

function readToken(body: unknown): string | undefined {
  if (!body || typeof body !== "object") return undefined;
  const record = body as Record<string, unknown>;
  const token = record.recaptchaToken ?? record["g-recaptcha-response"];
  return typeof token === "string" && token.length > 0 ? token : undefined;
}

/**
 * Route guard: returns an error response when reCAPTCHA is enforced and the
 * request's token is missing or invalid, otherwise null.
 */
export async function recaptchaGuard(body: unknown, remoteIp?: string): Promise<NextResponse | null> {
  if (!isRecaptchaEnforced()) return null;

  const token = readToken(body);
  if (!token) {
    return NextResponse.json({ error: "Please verify that you are not a robot." }, { status: 400 });
  }
  if (!(await verifyRecaptcha(token, remoteIp))) {
    return NextResponse.json({ error: "reCAPTCHA verification failed. Please try again." }, { status: 400 });
  }
  return null;
}
