/*
 * File: auto-backup.spec.ts
 * Purpose: E2E tests for auto-backup feature (4th tab in db-management).
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect, type Route } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

const AUTO_BACKUP_LIST_ROUTE = '**/api/v1/db-management/backup/auto/list'

const STUB_BACKUPS = {
  content: [
    {
      id: 1,
      fileName: 'backup_2024-03-17_120000.sql',
      generatedAt: 1710662400000,
      sizeBytes: 1024,
    },
    {
      id: 2,
      fileName: 'backup_2024-03-18_130000.sql',
      generatedAt: 1710748800000,
      sizeBytes: 2048,
    },
  ],
  totalElements: 2,
  totalPages: 1,
  number: 0,
  size: 10,
}

test.describe('Auto Backup - 4th tab', () => {
  test.beforeEach(async ({ page }) => {
    await injectTokens(page)
    await page.route(AUTO_BACKUP_LIST_ROUTE, async (route: Route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(STUB_BACKUPS),
      })
    })
  })

  test('displays backup list with buttons', async ({ page }) => {
    await page.goto('/en/db-management')
    await page.getByRole('tab', { name: 'Auto Backup' }).click()
    await page.waitForTimeout(500)
    await expect(
      page.getByRole('button', { name: 'Download' }).first()
    ).toBeVisible({ timeout: 15000 })
  })

  test('delete button opens confirmation dialog', async ({ page }) => {
    await page.goto('/en/db-management')
    await page.getByRole('tab', { name: 'Auto Backup' }).click()
    await page
      .getByRole('button', { name: 'Delete' })
      .first()
      .click({ timeout: 15000 })
    await expect(page.getByText(/Are you sure/i)).toBeVisible()
  })

  test('restore button opens confirmation dialog', async ({ page }) => {
    await page.goto('/en/db-management')
    await page.getByRole('tab', { name: 'Auto Backup' }).click()
    await page
      .getByRole('button', { name: 'Restore' })
      .first()
      .click({ timeout: 15000 })
    await expect(page.getByText(/Are you sure/i)).toBeVisible()
  })
})
