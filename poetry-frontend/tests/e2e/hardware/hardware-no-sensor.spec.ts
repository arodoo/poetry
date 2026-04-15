/*
 * File: hardware-no-sensor.spec.ts
 * Purpose: E2E tests for the hardware page when no fingerprint
 * sensor is connected. Verifies the page loads without blocking
 * and scanner controls render correctly.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect } from '@playwright/test'
import {
  injectTokens,
  getAuthTokens,
} from '../shared/providers/tokenProvider'

test.describe('Hardware – no sensor', () => {
  test('page loads without blocking', async ({ page }) => {
    await injectTokens(page)
    await page.goto('/en/hardware')
    const h = page.getByRole('heading', {
      name: /hardware|dispositivo/i, level: 1,
    })
    await expect(h).toBeVisible({ timeout: 15000 })
  })

  test('disconnected message visible', async ({ page }) => {
    await injectTokens(page)
    await page.goto('/en/hardware')
    await expect(
      page.getByTestId('scanner-disconnected')
    ).toBeVisible({ timeout: 10000 })
  })

  test('start button hidden', async ({ page }) => {
    await injectTokens(page)
    await page.goto('/en/hardware')
    await page.getByTestId('scanner-disconnected')
      .waitFor({ timeout: 10000 })
    await expect(
      page.getByTestId('scanner-start-btn')
    ).not.toBeVisible()
  })

  test('status API returns valid JSON', async ({ request }) => {
    const t = await getAuthTokens()
    const resp = await request.get(
      'http://localhost:8080/api/v1/hardware/status',
      { headers: { Authorization: `Bearer ${t.accessToken}` } }
    )
    expect(resp.status()).toBe(200)
    const b = (await resp.json()) as Record<string, unknown>
    expect(typeof b['connected']).toBe('boolean')
    expect(typeof b['scanning']).toBe('boolean')
  })
})
