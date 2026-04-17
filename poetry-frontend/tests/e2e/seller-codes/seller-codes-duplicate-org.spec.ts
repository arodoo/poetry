/*
 * File: seller-codes-duplicate-org.spec.ts
 * Purpose: E2E regression ensuring two seller codes can share
 * the same organizationId without triggering a unique-
 * constraint violation. The client reported "sobra el campo
 * de organización" because duplicate IDs were failing. This
 * test pins the current non-unique behaviour.
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

test('two seller codes can share the same organizationId', async () => {
  const ctx = await adminCtx()
  const orgId = `ORG-SHARED-${Date.now()}`
  const a = await ctx.post('/api/v1/seller-codes', {
    data: {
      code: `A-${Date.now()}`,
      userId: 1,
      organizationId: orgId,
      status: 'ACTIVE',
    },
  })
  expect(a.status()).toBeLessThan(300)
  const aBody = (await a.json()) as { id: number }

  const b = await ctx.post('/api/v1/seller-codes', {
    data: {
      code: `B-${Date.now()}`,
      userId: 1,
      organizationId: orgId,
      status: 'ACTIVE',
    },
  })
  expect(b.status()).toBeLessThan(300)
  const bBody = (await b.json()) as { id: number }
  expect(bBody.id).not.toBe(aBody.id)

  await ctx.delete(`/api/v1/seller-codes/${aBody.id}`)
  await ctx.delete(`/api/v1/seller-codes/${bBody.id}`)
  await ctx.dispose()
})
