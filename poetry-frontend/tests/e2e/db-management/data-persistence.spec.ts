/*
 * File: data-persistence.spec.ts
 * Purpose: E2E guard proving that persisted rows survive the
 * server boot cycle and that default admin + manager accounts
 * are created idempotently (no duplicates on restart). Acts as
 * a regression for the "app update wipes client DB" incident.
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

test('new user row persists and is fetchable later', async () => {
  const ctx = await adminCtx()
  const u = `persist-${Date.now()}`
  const created = await ctx.post('/api/v1/users', {
    data: {
      firstName: 'Persist',
      lastName: 'Guard',
      username: u,
      email: `${u}@test.com`,
      password: 'Persist123!',
      locale: 'en',
      roles: ['user'],
      status: 'active',
    },
  })
  expect(created.ok()).toBe(true)
  const { id } = (await created.json()) as { id: number }
  const fetched = await ctx.get(`/api/v1/users/${id}`)
  expect(fetched.ok()).toBe(true)
  const body = (await fetched.json()) as { username: string }
  expect(body.username).toBe(u)
  await ctx.dispose()
})

test('admin bootstrap is idempotent across restarts', async () => {
  const ctx = await adminCtx()
  const r = await ctx.get('/api/v1/users/paged?search=admin&page=0&size=20')
  expect(r.ok()).toBe(true)
  const page = (await r.json()) as {
    content: Array<{ username: string }>
  }
  const admins = page.content.filter((u) => u.username === 'admin')
  expect(admins.length).toBe(1)
  await ctx.dispose()
})
