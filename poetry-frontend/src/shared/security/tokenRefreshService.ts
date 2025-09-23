/*
 * File: tokenRefreshService.ts
 * Purpose: Automatic token refresh logic for expired access tokens.
 * All Rights Reserved. Arodi Emmanuel
 */
import { postRefresh } from '../../features/auth/api/authApi'
import { tokenStorage } from './tokenStorage'
import type { TokenBundle } from './tokenStorage'

// Track refresh promise to prevent concurrent refreshes
let refreshPromise: Promise<TokenBundle> | null = null

export async function refreshTokenIfNeeded(): Promise<TokenBundle | null> {
  const tokens: TokenBundle | null = tokenStorage.load()
  if (!tokens?.refreshToken) {
    return null
  }

  // If already refreshing, wait for that promise
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
    tokenStorage.clear() // Clear invalid tokens
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
