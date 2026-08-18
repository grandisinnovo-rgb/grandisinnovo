/**
 * Minimal in-memory rate limiter, keyed by IP.
 *
 * Resets on serverless cold-start and isn't shared across concurrent
 * instances on Vercel — stops naive spam/double-submits, but for real abuse
 * protection at scale, swap this for Upstash Redis (@upstash/ratelimit).
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true };
  }
  if (entry.count >= limit) return { success: false };

  entry.count += 1;
  return { success: true };
}

export function getClientIp(headers: Headers) {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
