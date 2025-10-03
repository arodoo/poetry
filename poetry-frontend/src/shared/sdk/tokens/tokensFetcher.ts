/*
 File: tokensFetcher.ts
 Purpose: Extracted tokens fetcher (ETag-aware) from the SDK to keep
 `index.ts` small. Returns a function that fetches tokens and caches
 results using ETag semantics.
 All Rights Reserved. Arodi Emmanuel
*/
import { createTimeout } from '../../http/timeout'
import type { Env } from '../../config/env'

export interface TokensRawResult<T> {
  readonly data: T
  readonly etag: string | null
}

interface TokensCache<T> {
  etag: string | null
  data: T | null
}

export function createTokensFetcher(
  env: Env
): () => Promise<TokensRawResult<unknown>> {
  const cache: TokensCache<unknown> = { etag: null, data: null }
  return async function fetchTokens(): Promise<TokensRawResult<unknown>> {
    const rawBase: string = env.VITE_API_BASE_URL
    const base: string = rawBase.replace(/\/$/, '')
    let url: string = base + '/api/v1/tokens'
    try {
      const b: URL = new URL(rawBase)
      const w: Location | undefined = (
        globalThis as unknown as { location?: Location }
      ).location
      if (w?.host && b.host && w.host !== b.host) url = '/api/v1/tokens'
    } catch {
      /* keep absolute url */
    }
    const timeoutMs: number = env.VITE_HTTP_TIMEOUT_MS
    const { signal, clear } = createTimeout(timeoutMs)
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (cache.etag) headers['If-None-Match'] = cache.etag
      const res: Response = await fetch(url, {
        method: 'GET',
        headers,
        signal,
      })
      if (res.status === 304 && cache.data !== null) {
        return { data: cache.data, etag: cache.etag }
      }
      if (!res.ok) {
        const text: string = await res.text()
        throw new Error(`HTTP ${String(res.status)}: ${text}`)
      }
      const etag: string | null = res.headers.get('ETag')
      const json: unknown = (await res.json()) as unknown
      cache.etag = etag
      cache.data = json
      return { data: json, etag }
    } finally {
      clear()
    }
  }
}
