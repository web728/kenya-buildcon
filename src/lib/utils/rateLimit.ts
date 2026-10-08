/**
 * Minimal in-memory sliding-window rate limiter for form API routes.
 * Sufficient for a single-instance Node deployment. If the app scales to
 * multiple instances/regions, replace with a shared store (e.g. Redis).
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 8;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);

  // Periodically prevent unbounded map growth.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t > WINDOW_MS)) hits.delete(k);
    }
  }

  return timestamps.length > MAX_REQUESTS;
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") || "unknown";
}
