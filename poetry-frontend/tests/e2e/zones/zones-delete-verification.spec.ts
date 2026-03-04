/*
 * File: zones-delete-verification.spec.ts
 * Purpose: E2E test to verify deleted zone disappears from list.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { seedZone, type SeedZone } from '../shared/fixtures/seedApi'

test.describe('Zones Delete Verification', (): void => {
  let zone: SeedZone

  test.beforeAll(async (): Promise<void> => {
    zone = await seedZone({ name: 'e2e-del-verify' })
  })

  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('deleted zone no longer appears in list', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto(`/en/zones/${zone.id}`)
    await expect(page.getByTestId('delete-zone-button')).toBeVisible({
      timeout: 10000,
    })
    await page.getByTestId('delete-zone-button').click()
    await page.waitForURL(new RegExp(`/en/zones/${zone.id}/delete`))

    const deleteApiPromise: Promise<Response> = page.waitForResponse(
      (r: Response): boolean =>
        r.url().includes(`/api/v1/zones/${zone.id}`) &&
        r.request().method() === 'DELETE'
    )

    await page.getByTestId('confirm-delete-zone-button').click()
    await deleteApiPromise
    await page.waitForURL(/\/en\/zones$/, { timeout: 5000 })

    const deletedBtn = page.locator(`[data-testid="view-zone-${zone.id}"]`)
    await expect(deletedBtn).not.toBeVisible({ timeout: 5000 })
  })
})
