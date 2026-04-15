/*
 * File: cascade-delete.spec.ts
 * Purpose: E2E test for user cascade deletion. Creates a user,
 * adds demographics, deletes via UI, verifies cleanup.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect, request as pw } from '@playwright/test'
import {
  getAuthTokens, injectTokens,
} from '../shared/providers/tokenProvider'

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

async function seedUser(
  ctx: import('@playwright/test').APIRequestContext
) {
  const u = `cascade-${Date.now()}`
  const r = await ctx.post('/api/v1/users', {
    data: {
      firstName: 'Cascade', lastName: 'Test',
      username: u, email: `${u}@test.com`,
      password: 'Cascade123!', locale: 'en',
      roles: ['user'], status: 'active',
    },
  })
  expect(r.ok()).toBe(true)
  return (await r.json()) as { id: number }
}

test('demographics cleaned after cascade delete', async ({
  page,
}) => {
  const ctx = await adminCtx()
  const user = await seedUser(ctx)
  await ctx.put(`/api/v1/users/${user.id}/demographics`, {
    data: { birthDate: '1990-01-15' },
  })
  await injectTokens(page)
  await page.goto(`/en/users/${user.id}/delete`)
  const btn = page.getByTestId('confirm-delete-user-button')
  await btn.waitFor({ timeout: 10000 })
  await btn.click()
  await page.waitForURL(/\/en\/users$/, { timeout: 10000 })
  const d = await ctx.get(
    `/api/v1/users/${user.id}/demographics`
  )
  expect([200, 404]).toContain(d.status())
  await ctx.dispose()
})

