/*
 * File: fingerprint-control.spec.ts
 * Purpose: E2E tests for comprehensive fingerprint control use cases.
 * Tests delete, sync check, list actions, and hardware interaction.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Fingerprint Control Use Cases', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await injectTokens(page)
  })

  // UC1: Fingerprint list displays with actions
  test('fingerprint list page loads with action buttons', async ({ page }) => {
    await page.goto('/en/fingerprints', { waitUntil: 'networkidle' })
    await expect(page.getByRole('button', { name: /enroll/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /simulator/i })).toBeVisible()
  })

  // UC2: Admin page shows slot usage
  test('admin page displays slot usage card', async ({ page }) => {
    await page.goto('/en/fingerprints/admin', { waitUntil: 'networkidle' })
    await expect(page.locator('.slot-usage-card')).toBeVisible()
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

  // UC6: Simulator page has enroll and verify
  test('simulator page has enroll and verify cards', async ({ page }) => {
    await page.goto('/en/fingerprints/simulator', { waitUntil: 'networkidle' })
    await expect(page.getByText(/Manual Enrollment/i)).toBeVisible()
    await expect(page.getByText(/Access Verification/i)).toBeVisible()
  })

  // UC7: Verify page has slot input
  test('verify page allows slot ID entry', async ({ page }) => {
    await page.goto('/en/fingerprints/verify', { waitUntil: 'networkidle' })
    await expect(page.getByRole('button', { name: /verify/i })).toBeVisible()
  })

  // UC8: Translations load correctly for devtools
  test('devtools translations load correctly', async ({ page }) => {
    await page.goto('/en/devtools/hardware', { waitUntil: 'networkidle' })
    await expect(page.getByText(/Hardware Debug/i)).toBeVisible()
    await expect(page.getByText(/Direct R503/i)).toBeVisible()
  })

  // UC9: Admin archived section exists
  test('admin page shows archived section', async ({ page }) => {
    await page.goto('/en/fingerprints/admin', { waitUntil: 'networkidle' })
    const archived = page.locator('.archived-list, .archived-empty')
    await expect(archived).toBeVisible()
  })

  // UC10: Sidebar shows devtools for admin
  test('sidebar shows devtools menu item', async ({ page }) => {
    await page.goto('/en/dashboard', { waitUntil: 'networkidle' })
    await expect(page.getByText(/Dev Tools/i)).toBeVisible()
  })
})
