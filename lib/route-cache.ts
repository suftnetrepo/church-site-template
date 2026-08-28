type CacheEntry = { data: unknown; expiresAt: number };

const cache = new Map<string, CacheEntry>();

/**
 * Caches the result of an async fetch (e.g. an axios call to Jerur) in memory
 * for `ttlMs`. Route handlers built on axios don't get Next.js's built-in
 * fetch cache, and without this, every client-side SWR revalidation (window
 * focus, reconnect, etc.) hits the upstream API directly — which is exactly
 * what tripped a 429 rate limit before this existed. Not a substitute for a
 * real cache (Redis, etc.) in a multi-instance deployment, but sufficient for
 * a single Node process and dramatically cuts upstream calls either way.
 */
export async function withRouteCache<T>(key: string, ttlMs: number, fetcher: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && cached.expiresAt > now) {
    return cached.data as T;
  }
  const data = await fetcher();
  cache.set(key, { data, expiresAt: now + ttlMs });
  return data;
}
