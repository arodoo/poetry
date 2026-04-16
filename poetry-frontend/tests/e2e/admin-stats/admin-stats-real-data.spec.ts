/*
 * File: admin-stats-real-data.spec.ts
 * Purpose: E2E test verifying the admin stats page shows real data.
 * Seeds its own membership to avoid depending on bootstrap state.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import {
  seedMembership,
  deleteMembership,
} from '../shared/fixtures/seedApi'

let membershipId: number | null = null

test.beforeAll(async (): Promise<void> => {
  const m = await seedMembership()
  membershipId = m.id
})

test.afterAll(async (): Promise<void> => {
  if (membershipId) {
    try { await deleteMembership(membershipId) } catch { /* ok */ }
  }
})

test.describe('Admin Stats - Real Data', (): void => {
  test('KPI cards show non-zero totals', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/admin/stats')
    await page.waitForSelector(
      '[data-testid="admin-stats-page"]',
      { timeout: 20000 }
    )
    const totalCard = page.getByTestId('kpi-card-total')
    await expect(totalCard).toBeVisible({ timeout: 10000 })
    const totalValue = totalCard.locator('p').first()
    await expect(totalValue).not.toHaveText('0', {
      timeout: 10000,
    })
  })

  test('active tab shows membership rows', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/admin/stats')
    await page.waitForSelector(
      '[data-testid="admin-stats-page"]',
      { timeout: 20000 }
    )
    const table = page.locator('table')
    await expect(table).toBeVisible({ timeout: 10000 })
    const rows = page.locator('tbody tr')
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
  })
})
