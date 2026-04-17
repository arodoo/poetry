/*
 * File: hardware-no-polling.spec.ts
 * Purpose: Regression ensuring the hardware status page does NOT
 * auto-poll the reader. The app must stay responsive when no
 * sensor is attached. Also validates the Try Connect button
 * issues exactly one extra request per click.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

const STATUS_URL = '/api/v1/hardware/status'

test('hardware page fetches status only once on load', async ({ page }) => {
  await injectTokens(page)
  const calls: string[] = []
  page.on('request', (req) => {
    if (req.url().includes(STATUS_URL)) calls.push(req.url())
  })
  await page.goto('/en/hardware')
  await page.getByTestId('hardware-try-connect').waitFor({
    timeout: 10_000,
  })
  const baseline = calls.length
  await page.waitForTimeout(8_000)
  expect(calls.length).toBe(baseline)
})

test('Try Connect button triggers exactly one extra status call', async ({
  page,
}) => {
  await injectTokens(page)
  const calls: string[] = []
  page.on('request', (req) => {
    if (req.url().includes(STATUS_URL)) calls.push(req.url())
  })
  await page.goto('/en/hardware')
  const btn = page.getByTestId('hardware-try-connect')
  await btn.waitFor({ timeout: 10_000 })
  const before = calls.length
  await btn.click()
  await page.waitForTimeout(1_500)
  expect(calls.length).toBe(before + 1)
})

test('page remains usable without reader (no blocking spinner)', async ({
  page,
}) => {
  await injectTokens(page)
  await page.goto('/en/hardware')
  await page.getByTestId('hardware-status-page').waitFor({ timeout: 10_000 })
  await expect(page.getByTestId('hardware-try-connect')).toBeVisible()
})
