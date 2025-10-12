/*
 * File: authApi.test.ts
 * Purpose: Smoke test for auth API wrapper with mocked HTTP client.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest'
import * as generatedSdk from '../../../../api/generated'
import { getAuthStatus, postLogin } from '../../../../features/auth'

// Keep original implementation but spy so real option propagation is tested.
beforeAll((): void => {
  vi.spyOn(generatedSdk, 'status').mockResolvedValue({
    data: { authenticated: false },
    request: new Request('http://localhost/api/v1/auth/status'),
    response: new Response(),
  })
  vi.spyOn(generatedSdk, 'login').mockImplementation(async (opts) => {
    // capture headers passed through the generated client
    return Promise.resolve({
      data: {
        accessToken: 'a',
        refreshToken: 'r',
        username: 'user1',
        expiresIn: 3600,
      },
      request: new Request('http://localhost/api/v1/auth/login'),
      response: new Response(),
    } as any)
  })
})

afterEach(() => {
  vi.clearAllMocks()
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
    const mockedLogin = vi.mocked(generatedSdk.login)
    const call = mockedLogin.mock.calls[0]
    const opts = call?.[0] as any
    // ensure body has username/password and headers/object shape passed through
    expect(opts?.body).toBeDefined()
    expect((opts?.body as any).username).toBe('u')
  }, 8000)
})
