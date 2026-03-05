/*
 * File: zones-list-columns.spec.ts
 * Purpose: E2E test verifying the zones list table renders the zone
 * name (not numeric ID) and the manager username (not manager ID).
 * Catches Bug #3 where columns displayed raw IDs.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test('zones list shows name and manager username', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/zones')
  await page.waitForLoadState('load')

  await expect(
    page.getByRole('heading', { name: /Zones/i })
  ).toBeVisible({ timeout: 10000 })

  const firstRow: Locator = page
    .locator('table tbody tr')
    .first()
  await expect(firstRow).toBeVisible({ timeout: 10000 })

  const cells: Locator = firstRow.locator('td')
  const nameCell = await cells.nth(0).textContent()
  const managerCell = await cells.nth(1).textContent()

  expect(nameCell?.trim()).toBeTruthy()
  expect(nameCell).not.toMatch(/^\d+$/)

  expect(managerCell?.trim()).toBeTruthy()
  expect(managerCell).not.toMatch(/^\d+$/)
})
