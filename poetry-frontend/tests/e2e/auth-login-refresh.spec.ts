/*
 File: auth-login-refresh.spec.ts
 Purpose: Minimal E2E verifying login + refresh token flow.
 All Rights Reserved. Arodi Emmanuel
*/
import {
  test,
  expect,
  request,
  type APIRequestContext,
  type APIResponse,
} from '@playwright/test'

interface TokenResponse {
  username: string
  accessToken: string
  refreshToken: string
  expiresIn: number
}

const U: string = 'admin'
const P: string = 'ChangeMe123!'

// Direct API test to bypass UI complexity and verify core functionality
test('backend login and refresh tokens work end-to-end', async (): Promise<void> => {
  const api: APIRequestContext = await request.newContext({
    baseURL: 'http://localhost:8080',
  })

  // Step 1: Login via API
  const loginResp: APIResponse = await api.post('/api/v1/auth/login', {
    data: { username: U, password: P },
    headers: { 'Content-Type': 'application/json' },
  })
  expect(loginResp.ok()).toBeTruthy()
  const tokens: unknown = await loginResp.json()
  const t: TokenResponse = tokens as TokenResponse
  expect(t.username).toBe(U)
  expect(t.accessToken).toBeTruthy()
  expect(t.refreshToken).toBeTruthy()
  expect(t.expiresIn).toBeGreaterThan(100)

  // Step 2: Use refresh token to get new tokens
  const refreshResp: APIResponse = await api.post('/api/v1/auth/refresh', {
    data: { refreshToken: t.refreshToken },
    headers: { 'Content-Type': 'application/json' },
  })
  expect(refreshResp.ok()).toBeTruthy()
  const refreshed: unknown = await refreshResp.json()
  const r: TokenResponse = refreshed as TokenResponse
  expect(r.username).toBe(U)
  expect(r.accessToken).not.toBe(t.accessToken)
  expect(r.refreshToken).not.toBe(t.refreshToken)
  expect(r.expiresIn).toBeGreaterThan(100)
})
