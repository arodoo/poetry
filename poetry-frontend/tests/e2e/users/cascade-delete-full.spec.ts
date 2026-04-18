/*
 * File: cascade-delete-full.spec.ts
 * Purpose: E2E regression verifying that deleting a user cascades to
 * seller codes, demographics, memberships and fingerprints. Protects
 * against the client-reported ghost-data leftovers when an admin
 * removes a user. Seeds each related entity before delete and asserts
 * it returns 404/410 afterwards.
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

test('user delete cascades to every related entity', async () => {
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

  const fp = await ctx.post(`/api/v1/users/${userId}/fingerprints/enroll`, {
    data: { fmd: `FMD-${Date.now()}` },
  })
  expect(fp.status(), await fp.text()).toBe(201)
  const fpId = ((await fp.json()) as { fingerprintId: number }).fingerprintId

  const mb = await ctx.post('/api/v1/memberships', {
    data: {
      userId,
      subscriptionId: 1,
      sellerCode: 'codigo001',
      allZones: true,
    },
  })
  expect(mb.status(), await mb.text()).toBe(201)
  const mbId = ((await mb.json()) as { id: number }).id

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

  const fpAfter = await ctx.get(`/api/v1/fingerprints/${fpId}`)
  expect(fpAfter.status(), 'fp should be gone').toBeGreaterThanOrEqual(400)

  const mbAfter = await ctx.get(`/api/v1/memberships/${mbId}`)
  expect([404, 410]).toContain(mbAfter.status())

  // Cross-check via list endpoints: the rows must not appear at all.
  const scList = await ctx.get('/api/v1/seller-codes/paged?page=0&size=100')
  expect(scList.status(), await scList.text()).toBe(200)
  const scBody = (await scList.json()) as { content: { id: number }[] }
  expect(scBody.content.map((x): number => x.id)).not.toContain(scId)

  const mbList = await ctx.get('/api/v1/memberships/paged?page=0&size=100')
  expect(mbList.status(), await mbList.text()).toBe(200)
  const mbBody = (await mbList.json()) as { content: { id: number }[] }
  expect(mbBody.content.map((x): number => x.id)).not.toContain(mbId)

  await ctx.dispose()
})
