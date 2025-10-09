/*
 * File: tokenExpiry.test.ts
 * Purpose: Test JWT token expiration checking and proactive refresh
 * logic to ensure users remain logged in over extended periods.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { isTokenExpiringSoon, getTokenExpiryTime } from
  '../../../shared/security/tokenExpiry'

function createMockJwt(expiresInSeconds: number): string {
  const now = Math.floor(Date.now() / 1000)
  const exp = now + expiresInSeconds
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(
    JSON.stringify({ sub: 'testuser', exp, iat: now })
  )
  const signature = 'mock-signature'
  return `${header}.${payload}.${signature}`
}

describe('tokenExpiry', () => {
  describe('isTokenExpiringSoon', () => {
    it('returns false for tokens expiring in >60s', () => {
      const token = createMockJwt(300)
      expect(isTokenExpiringSoon(token)).toBe(false)
    })

    it('returns true for tokens expiring in <60s', () => {
      const token = createMockJwt(30)
      expect(isTokenExpiringSoon(token)).toBe(true)
    })

    it('returns true for expired tokens', () => {
      const token = createMockJwt(-10)
      expect(isTokenExpiringSoon(token)).toBe(true)
    })

    it('returns true for tokens with custom buffer', () => {
      const token = createMockJwt(100)
      expect(isTokenExpiringSoon(token, 120)).toBe(true)
      expect(isTokenExpiringSoon(token, 80)).toBe(false)
    })

    it('returns true for invalid tokens', () => {
      expect(isTokenExpiringSoon('invalid-token')).toBe(true)
    })
  })

  describe('getTokenExpiryTime', () => {
    it('returns expiry time in milliseconds', () => {
      const expiresIn = 900
      const token = createMockJwt(expiresIn)
      const expiry = getTokenExpiryTime(token)
      expect(expiry).toBeGreaterThan(Date.now())
    })

    it('returns null for invalid tokens', () => {
      expect(getTokenExpiryTime('invalid')).toBeNull()
    })
  })
})
