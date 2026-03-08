/*
 * File: admin-stats-real-data.spec.ts
 * Purpose: E2E test verifying the admin stats page shows real data
 * from the backend bootstrap seeder. Catches Bug #6 where the page
 * showed "No memberships found" due to disabled bootstrap.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Admin Stats - Real Data', (): void => {
  test('KPI cards show non-zero totals from bootstrap', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/admin/stats')

    await page.waitForSelector('[data-testid="admin-stats-page"]', {
      timeout: 20000,
    })

    const totalCard = page.getByTestId('kpi-card-total')
    await expect(totalCard).toBeVisible({ timeout: 10000 })

    const totalValue = totalCard.locator('p').first()
    await expect(totalValue).not.toHaveText('0', {
      timeout: 10000,
    })
  })

  test('active tab shows membership rows', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/admin/stats')

    await page.waitForSelector('[data-testid="admin-stats-page"]', {
      timeout: 20000,
    })

    const table = page.locator('table')
    await expect(table).toBeVisible({ timeout: 10000 })

    const rows = page.locator('tbody tr')
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
  })
})
