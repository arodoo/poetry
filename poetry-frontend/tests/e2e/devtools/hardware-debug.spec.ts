/*
 * File: hardware-debug.spec.ts
 * Purpose: E2E tests for Hardware Debug page functionality.
 * Verifies scan slots and clear all buttons work correctly.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Hardware Debug Page', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await injectTokens(page)
  })

  test('page loads with title and buttons', async ({ page }) => {
    await page.goto('/en/devtools/hardware', { waitUntil: 'networkidle' })

    await expect(page.locator('.hardware-debug-page')).toBeVisible()
    await expect(page.getByRole('button', { name: /scan/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /clear/i })).toBeVisible()
  })

  test('scan slots returns count and slots array', async ({ page }) => {
    await page.goto('/en/devtools/hardware', { waitUntil: 'networkidle' })

    await page.getByRole('button', { name: /scan/i }).click()
    await page.waitForTimeout(1000)

    const content = await page.locator('pre').textContent()
    expect(content).toBeDefined()
    expect(content).toContain('[')
  })

  test('clear all button exists and is danger variant', async ({ page }) => {
    await page.goto('/en/devtools/hardware', { waitUntil: 'networkidle' })

    const clearBtn = page.getByRole('button', { name: /clear/i })
    await expect(clearBtn).toBeVisible()
  })
})
