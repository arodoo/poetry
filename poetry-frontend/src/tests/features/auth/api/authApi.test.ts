/*
 * File: authApi.test.ts
 * Purpose: Smoke test for auth API wrapper with mocked HTTP client.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest'
import * as Fetch from '../../../../shared/http/fetchClient'
import { getAuthStatus, postLogin } from '../../../../features/auth'

// Keep original implementation but spy so real option propagation is tested.
const originalFetchJson = Fetch.fetchJson
beforeAll((): void => {
  type AnyJson = Record<string, unknown>
  vi.spyOn(Fetch, 'fetchJson').mockImplementation(
    async (
      p: string,
      o?: { headers?: Record<string, string> }
    ): Promise<AnyJson> => {
      if (p.endsWith('/api/v1/auth/status')) return { authenticated: false }
      if (p.endsWith('/api/v1/auth/login'))
        return {
          accessToken: 'a',
          refreshToken: 'r',
          username: 'user1',
          expiresIn: 3600,
        }
      return originalFetchJson(p, o)
    }
  )
})

afterEach(() => {
  // ensure calls reset between tests
  vi.mocked(Fetch.fetchJson).mockClear()
})

describe('authApi', () => {
  it('returns status', async () => {
    const r = await getAuthStatus()
    expect(r.authenticated).toBe(false)
  }, 8000)
})

describe('authApi headers', () => {
  it('sends Idempotency-Key on login', async () => {
    await postLogin('u', 'p')
    const mocked = vi.mocked(Fetch.fetchJson)
    const call = mocked.mock.calls.find((c) =>
      String(c[0]).includes('/auth/login')
    )
    const options = call?.[1] as { headers?: Record<string, string> }
    expect(options?.headers?.['Idempotency-Key']).toMatch(/^idem-/)
  }, 8000)
})
