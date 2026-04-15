/*
 * File: scanner-control.spec.ts
 * Purpose: E2E tests for the scanner control REST API. Verifies
 * start/stop/state endpoints return valid responses when no
 * hardware is connected.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect, request as pw } from '@playwright/test'
import { getAuthTokens } from '../shared/providers/tokenProvider'

const API = 'http://localhost:8080'

async function adminCtx() {
  const t = await getAuthTokens()
  return pw.newContext({
    baseURL: API,
    extraHTTPHeaders: {
      Authorization: `Bearer ${t.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
}

test.describe('Scanner Control API', () => {
  test('GET state returns valid JSON', async () => {
    const ctx = await adminCtx()
    const resp = await ctx.get('/api/v1/hardware/scanner/state')
    expect(resp.status()).toBe(200)
    const body = (await resp.json()) as { scanning: boolean }
    expect(typeof body.scanning).toBe('boolean')
    await ctx.dispose()
  })

  test('POST start without sensor returns ok', async () => {
    const ctx = await adminCtx()
    const resp = await ctx.post('/api/v1/hardware/scanner/start')
    expect([200, 204]).toContain(resp.status())
    await ctx.dispose()
  })

  test('POST stop returns ok', async () => {
    const ctx = await adminCtx()
    const resp = await ctx.post('/api/v1/hardware/scanner/stop')
    expect([200, 204]).toContain(resp.status())
    await ctx.dispose()
  })
})
