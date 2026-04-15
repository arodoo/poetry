/*
 * File: seller-codes-nullable-org.spec.ts
 * Purpose: E2E test verifying seller codes can be created with a
 * null or empty organizationId. Previously this caused a 500
 * error due to a NOT NULL constraint.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect, request as pw } from '@playwright/test'
import { getAuthTokens } from '../shared/providers/tokenProvider'

async function adminCtx() {
  const t = await getAuthTokens()
  return pw.newContext({
    baseURL: 'http://localhost:8080',
    extraHTTPHeaders: {
      Authorization: `Bearer ${t.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
}

test.describe('Seller Code – nullable orgId', () => {
  test('create with null organizationId', async () => {
    const ctx = await adminCtx()
    const code = `NOORG-${Date.now()}`
    const resp = await ctx.post('/api/v1/seller-codes', {
      data: { code, userId: 1, organizationId: null },
    })
    expect(resp.status()).toBeLessThan(300)
    const body = (await resp.json()) as { id: number; code: string }
    expect(body.code).toBe(code)
    await ctx.delete(`/api/v1/seller-codes/${body.id}`)
    await ctx.dispose()
  })

  test('create with empty string orgId', async () => {
    const ctx = await adminCtx()
    const code = `EMPTYORG-${Date.now()}`
    const resp = await ctx.post('/api/v1/seller-codes', {
      data: { code, userId: 1, organizationId: '' },
    })
    expect(resp.status()).toBeLessThan(300)
    const body = (await resp.json()) as { id: number }
    expect(body.id).toBeGreaterThan(0)
    await ctx.delete(`/api/v1/seller-codes/${body.id}`)
    await ctx.dispose()
  })
})
