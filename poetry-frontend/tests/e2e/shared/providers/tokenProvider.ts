/*
 * File: tokenProvider.ts
 * Purpose: Central reusable token acquisition & refresh cache for e2e tests (shared folder).
 * All Rights Reserved. Arodi Emmanuel
 */
import { login, refresh } from './tokenService'
import { TOKEN_STORAGE_KEY } from '../../../../src/shared/security/tokenStorage'

export interface CachedTokens {
  accessToken: string
  refreshToken: string
  username: string
  expiresAt: number
}

let cache: CachedTokens | null = null
let inflight: Promise<CachedTokens> | null = null

export async function getAuthTokens(): Promise<CachedTokens> {
  if (cache && Date.now() < cache.expiresAt) return cache
  if (inflight) return inflight
  inflight = (async function getTokens(): Promise<CachedTokens> {
    try {
      const now: number = Date.now()
      const current: CachedTokens | null = cache
      if (current == null) {
        cache = await login()
      } else if (now >= current.expiresAt) {
        cache = await refresh(current)
      }
      if (cache == null) throw new Error('Failed to obtain tokens')
      return cache
    } finally {
      inflight = null
    }
  })()
  return inflight
}

export async function injectTokens(
  page: import('@playwright/test').Page
): Promise<void> {
  const t: CachedTokens = await getAuthTokens()
  await page.addInitScript(
    ([k, v]: [string, string]): void => {
      localStorage.setItem(k, v)
    },
    [
      TOKEN_STORAGE_KEY,
      JSON.stringify({
        accessToken: t.accessToken,
        refreshToken: t.refreshToken,
      }),
    ] as [string, string]
  )
}

export function clearTokenCache(): void {
  cache = null
}
