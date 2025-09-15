/*
 * File: authApi.test.ts
 * Purpose: Smoke test for auth API wrapper with mocked HTTP client.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi } from 'vitest'

import * as Fetch from '../../../../shared/http/fetchClient'
vi.mock('../../../../shared/http/fetchClient', async () => {
  const mod = await vi.importActual('../../../../shared/http/fetchClient')
  return {
    ...mod,
    fetchJson: vi.fn().mockResolvedValue({ authenticated: false }),
  }
})
import { getAuthStatus, postLogin } from '../../../../features/auth'

describe('authApi', () => {
  it('returns status', async () => {
    const r = await getAuthStatus()
    expect(r.authenticated).toBe(false)
  })
})

describe('authApi headers', () => {
  it('sends Idempotency-Key on login', async () => {
    const mocked = vi.mocked(Fetch.fetchJson)
    mocked.mockResolvedValueOnce({
      accessToken: 'a',
      refreshToken: 'r',
      tokenType: 'Bearer',
      expiresIn: 3600,
    })
    await postLogin('u', 'p')
    const call = mocked.mock.calls.at(-1)
    const options = call?.[1] as { headers?: Record<string, string> }
    expect(options?.headers?.['Idempotency-Key']).toMatch(/^idem-/)
  })
})
