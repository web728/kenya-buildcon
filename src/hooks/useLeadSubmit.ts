"use client";

import { useState } from "react";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function useLeadSubmit(endpoint: string) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /** Posts the payload; resolves true on success so callers can reset single-use widgets on failure. */
  async function submit(payload: Record<string, unknown>): Promise<boolean> {
    if (status === "submitting") return false; // guard against double submission
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json: { success?: boolean; error?: string; referenceId?: string } = await res
        .json()
        .catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setReferenceId(json.referenceId ?? null);
      setStatus("success");
      return true;
    } catch (err) {
      const offline = typeof navigator !== "undefined" && !navigator.onLine;
      setErrorMessage(
        offline
          ? "You appear to be offline. Please check your connection and try again."
          : err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      );
      setStatus("error");
      return false;
    }
  }

  return { submit, status, referenceId, errorMessage };
}

export function getUtmFromLocation(): { source?: string; medium?: string; campaign?: string } {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("utm_source") ?? undefined,
    medium: params.get("utm_medium") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
  };
}
