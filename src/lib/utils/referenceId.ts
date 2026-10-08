const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I

function randomSegment(length: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

export type ReferencePrefix = "KBEX" | "KBVR" | "KBPT" | "KBCN" | "BRCH" | "CKIE";

/** Generates a human-readable reference ID, e.g. KBEX-4K7QZP or CKIE-4K7QZP. */
export function generateReferenceId(prefix: ReferencePrefix): string {
  return `${prefix}-${randomSegment(6)}`;
}

export type ConsentPreferences = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

export const CONSENT_STORAGE_KEY = "kbex_cookie_consent";
export const CONSENT_UPDATED_EVENT = "kbex-consent-updated";

export function readConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentPreferences;
  } catch {
    return null;
  }
}

export function writeConsent(prefs: ConsentPreferences): void {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs));
  window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: prefs }));
}