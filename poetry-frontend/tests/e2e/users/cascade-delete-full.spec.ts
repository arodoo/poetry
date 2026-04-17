/*
 * File: cascade-delete-full.spec.ts
 * Purpose: E2E regression verifying that deleting a user also
 * cleans up their seller codes and demographics (soft-delete).
 * Protects against the client-reported ghost data left behind
 * when administrators remove users from the system.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect, request as pw } from '@playwright/test'
import type { APIRequestContext } from '@playwright/test'
import { getAuthTokens } from '../shared/providers/tokenProvider'

async function adminCtx(): Promise<APIRequestContext> {
  const t = await getAuthTokens()
  return pw.newContext({
    baseURL: 'http://localhost:8080',
    extraHTTPHeaders: {
      Authorization: `Bearer ${t.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
}

async function seedUser(ctx: APIRequestContext): Promise<number> {
  const u = `cascfull-${Date.now()}`
  const r = await ctx.post('/api/v1/users', {
    data: {
      firstName: 'Casc',
      lastName: 'Full',
      username: u,
      email: `${u}@test.com`,
      password: 'Cascade123!',
      locale: 'en',
      roles: ['user'],
      status: 'active',
    },
  })
  expect(r.ok()).toBe(true)
  return ((await r.json()) as { id: number }).id
}

test('user delete cascades to seller codes + demographics', async () => {
  const ctx = await adminCtx()
  const userId = await seedUser(ctx)

  const sc = await ctx.post('/api/v1/seller-codes', {
    data: { code: `SC-${Date.now()}`, userId, status: 'ACTIVE' },
  })
  expect(sc.ok()).toBe(true)
  const scId = ((await sc.json()) as { id: number }).id

  const dem = await ctx.put(`/api/v1/users/${userId}/demographics`, {
    data: { birthDate: '1990-01-15' },
  })
  expect(dem.ok()).toBe(true)

  const userResp = await ctx.get(`/api/v1/users/${userId}`)
  const etag = userResp.headers()['etag'] ?? ''
  expect(etag).toBeTruthy()

  const del = await ctx.delete(`/api/v1/users/${userId}`, {
    headers: { 'If-Match': etag },
  })
  expect(del.ok()).toBe(true)

  const scAfter = await ctx.get(`/api/v1/seller-codes/${scId}`)
  expect([404, 410]).toContain(scAfter.status())

  const demAfter = await ctx.get(`/api/v1/users/${userId}/demographics`)
  expect([404, 410]).toContain(demAfter.status())

  await ctx.dispose()
})
