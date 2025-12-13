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
    // Enroll button removed as per requirements
    await expect(page.getByRole('button', { name: /simulator/i })).toBeVisible()
  })

  // UC2: Admin page shows slot usage
  test('admin page displays slot usage card', async ({ page }) => {
    await page.goto('/en/fingerprints/admin', { waitUntil: 'networkidle' })
    await expect(page.locator('.slot-usage-card')).toBeVisible()
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
