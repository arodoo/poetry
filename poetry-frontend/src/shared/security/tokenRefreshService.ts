/*
 * File: tokenRefreshService.ts
 * Purpose: Proactive token refresh to prevent expiry-related logout.
 * Checks JWT exp claim before requests and refreshes with buffer time.
 * All Rights Reserved. Arodi Emmanuel
 */
import { postRefresh } from '../../features/auth/api/authApi'
import { tokenStorage } from './tokenStorage'
import { isTokenExpiringSoon } from './tokenExpiry'
import type { TokenBundle } from './tokenStorage'

let refreshPromise: Promise<TokenBundle> | null = null

export async function refreshTokenIfNeeded(): Promise<TokenBundle | null> {
  const tokens: TokenBundle | null = tokenStorage.load()
  if (!tokens?.refreshToken || !tokens?.accessToken) {
    return null
  }

  const needsRefresh: boolean = isTokenExpiringSoon(tokens.accessToken)
  if (!needsRefresh) {
    return tokens
  }

  if (refreshPromise) {
    try {
      return await refreshPromise
    } catch (_e: unknown) {
      refreshPromise = null
      void _e
      return null
    }
  }

  try {
    refreshPromise = performRefresh(tokens.refreshToken)
    const newTokens: TokenBundle = await refreshPromise
    refreshPromise = null
    return newTokens
  } catch (_e: unknown) {
    refreshPromise = null
    void _e
    tokenStorage.clear()
    return null
  }
}

async function performRefresh(refreshToken: string): Promise<TokenBundle> {
  const response: { accessToken: string; refreshToken: string } =
    await postRefresh(refreshToken)
  const newTokens: TokenBundle = {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  }
  tokenStorage.save(newTokens)
  return newTokens
}
