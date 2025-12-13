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

  // UC3: Hardware debug page loads
  test('hardware debug page loads with controls', async ({ page }) => {
    await page.goto('/en/devtools/hardware', { waitUntil: 'networkidle' })
    await expect(page.locator('.hardware-debug-page')).toBeVisible()
    await expect(page.getByRole('button', { name: /scan/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /clear/i })).toBeVisible()
  })

  // UC4: Hardware scan returns sensor data
  test('scan slots returns hardware state', async ({ page }) => {
    await page.goto('/en/devtools/hardware', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: /scan/i }).click()
    await page.waitForTimeout(1000)
    await expect(page.getByText(/Hardware \(R503\)/i)).toBeVisible()
    await expect(page.getByText(/Database/i)).toBeVisible()
  })

  // UC5: Sync check shows comparison
  test('sync check shows DB vs hardware comparison', async ({ page }) => {
    await page.goto('/en/devtools/hardware', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: /scan/i }).click()
    await page.waitForTimeout(1000)
    const dbCard = page.getByText('Database')
    await expect(dbCard).toBeVisible()
  })

  // UC8: Translations load correctly for devtools
  test('devtools translations load correctly', async ({ page }) => {
    await page.goto('/en/devtools/hardware', { waitUntil: 'networkidle' })
    await expect(page.getByText(/Hardware Debug/i)).toBeVisible()
    await expect(page.getByText(/Direct R503/i)).toBeVisible()
  })

  test('UC11: clear all requires confirmation', async ({ page }) => {
    await page.goto('/en/devtools/hardware', { waitUntil: 'networkidle' })

    // Click clear button
    await page.getByRole('button', { name: /clear/i }).click()

    // Verify modal appears
    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible()
    await expect(modal).toContainText(/Are you sure/i)

    // Click cancel
    await page.getByRole('button', { name: /cancel/i }).click()
    await expect(modal).not.toBeVisible()
  })
})
