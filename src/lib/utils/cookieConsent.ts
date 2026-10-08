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
