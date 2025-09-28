/*
 * File: auth-login-refresh.spec.ts
 * Purpose: Minimal E2E verifying login + refresh token flow.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import {
  getAuthTokens,
  clearTokenCache,
  type CachedTokens,
} from '../shared/providers/tokenProvider'

test('backend login and refresh tokens work end-to-end (cached provider)', async (): Promise<void> => {
  clearTokenCache()
  const first: CachedTokens = await getAuthTokens()
  expect(first.username).toBe('admin')
  expect(first.accessToken).toBeTruthy()
  const prevAccess: string = first.accessToken
  const prevRefresh: string = first.refreshToken

  // Force refresh path by simulating expiry
  ;(first as unknown as CachedTokens).expiresAt = Date.now() - 1000
  const second: CachedTokens = await getAuthTokens()
  expect(second.accessToken).not.toBe(prevAccess)
  expect(second.refreshToken).not.toBe(prevRefresh)
  expect(second.username).toBe('admin')
})
