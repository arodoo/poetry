/*
 * File: users-admin-password-reset.spec.ts
 * Purpose: E2E test for admin password reset feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, request } from '@playwright/test'

const API_BASE = 'http://localhost:8080'
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'ChangeMe123!'

test.describe('Admin password reset', () => {
  let accessToken: string
  const testUserId = 2 // ID de gerente1
  const testUsername = 'gerente1'
  const testUserOriginalPassword = 'ChangeMe123!'
  const testUserNewPassword = 'NewTestPass123!'

  test.beforeAll(async () => {
    const ctx = await request.newContext({ baseURL: API_BASE })

    const loginResp = await ctx.post('/api/v1/auth/login', {
      data: { username: ADMIN_USER, password: ADMIN_PASS },
      headers: { 'Content-Type': 'application/json' },
    })
    if (!loginResp.ok()) {
      throw new Error(`Login failed: ${loginResp.status()}`)
    }
    const data = (await loginResp.json()) as { accessToken: string }
    accessToken = data.accessToken

    await ctx.dispose()
  })

  test.beforeEach(async () => {
    const ctx = await request.newContext({ baseURL: API_BASE })
    const loginResp = await ctx.post('/api/v1/auth/login', {
      data: { username: ADMIN_USER, password: ADMIN_PASS },
      headers: { 'Content-Type': 'application/json' },
    })
    if (loginResp.ok()) {
      const data = (await loginResp.json()) as { accessToken: string }
      accessToken = data.accessToken
    }
    await ctx.dispose()
  })

  test('complete password reset flow: change -> test old -> test new -> restore', async () => {
    const ctx = await request.newContext({ baseURL: API_BASE })

    // 1. Change user password
    const changeResp = await ctx.put(`/api/v1/users/${testUserId}/password`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: { password: testUserNewPassword },
    })
    expect(changeResp.status()).toBe(204)

    // 2. Try to login with old password (should fail)
    const loginOldResp = await ctx.post('/api/v1/auth/login', {
      data: { username: testUsername, password: testUserOriginalPassword },
      headers: { 'Content-Type': 'application/json' },
    })
    expect(loginOldResp.status()).toBe(401)

    // 3. Try to login with new password (should succeed)
    const loginNewResp = await ctx.post('/api/v1/auth/login', {
      data: { username: testUsername, password: testUserNewPassword },
      headers: { 'Content-Type': 'application/json' },
    })
    expect(loginNewResp.status()).toBe(200)
    const newLoginData = (await loginNewResp.json()) as { accessToken: string }
    expect(newLoginData.accessToken).toBeTruthy()

    // 4. Restore original password
    const restoreResp = await ctx.put(`/api/v1/users/${testUserId}/password`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: { password: testUserOriginalPassword },
    })
    expect(restoreResp.status()).toBe(204)

    await ctx.dispose()
  })
})
