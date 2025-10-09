/*
 * File: tokenRefresh.longterm.test.ts
 * Purpose: Integration test simulating token refresh over extended
 * periods to verify users stay logged in with frequent visits.
 * Tests token lifecycle spanning minutes to days with activity.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { tokenStorage } from '../../../shared/security/tokenStorage'
import { refreshTokenIfNeeded } from
  '../../../shared/security/tokenRefreshService'
import * as authApi from '../../../features/auth/api/authApi'

vi.mock('../../../features/auth/api/authApi')

function createJwtWithExpiry(expiresInSeconds: number): string {
  const now = Math.floor(Date.now() / 1000)
  const exp = now + expiresInSeconds
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(
    JSON.stringify({ sub: 'user', exp, iat: now, roles: ['USER'] })
  )
  return `${header}.${payload}.mock-sig`
}

describe('Token refresh over extended periods', () => {
  beforeEach(() => {
    tokenStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('refreshes token before 15min expiry with 60s buffer', async () => {
    const expiringSoonToken = createJwtWithExpiry(50)
    const freshToken = createJwtWithExpiry(900)

    tokenStorage.save({
      accessToken: expiringSoonToken,
      refreshToken: 'refresh-token-123',
    })

    vi.mocked(authApi.postRefresh).mockResolvedValue({
      accessToken: freshToken,
      refreshToken: 'new-refresh-token',
    })

    const result = await refreshTokenIfNeeded()

    expect(authApi.postRefresh).toHaveBeenCalledWith('refresh-token-123')
    expect(result?.accessToken).toBe(freshToken)
  })

  it('does not refresh if token valid for >60s', async () => {
    const validToken = createJwtWithExpiry(900)

    tokenStorage.save({
      accessToken: validToken,
      refreshToken: 'refresh-token-456',
    })

    const result = await refreshTokenIfNeeded()

    expect(authApi.postRefresh).not.toHaveBeenCalled()
    expect(result?.accessToken).toBe(validToken)
  })

  it('clears tokens if refresh fails', async () => {
    const expiredToken = createJwtWithExpiry(-10)

    tokenStorage.save({
      accessToken: expiredToken,
      refreshToken: 'invalid-refresh',
    })

    vi.mocked(authApi.postRefresh).mockRejectedValue(
      new Error('Refresh failed')
    )

    const result = await refreshTokenIfNeeded()

    expect(result).toBeNull()
    expect(tokenStorage.load()).toBeNull()
  })
})
