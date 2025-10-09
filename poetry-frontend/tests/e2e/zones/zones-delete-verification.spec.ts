/*
 * File: zones-delete-verification.spec.ts
 * Purpose: E2E test to verify deleted zone disappears from list.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Zones Delete Verification', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('deleted zone no longer appears in list', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/en/zones')
    await page.waitForLoadState('networkidle')

    const firstViewButton = page.locator('[data-testid^="view-zone-"]').first()
    const testIdAttr = await firstViewButton.getAttribute('data-testid')
    const zoneId = testIdAttr?.replace('view-zone-', '') || ''

    const zoneNameElement = page.locator(`[data-testid="view-zone-${zoneId}"]`)
      .locator('xpath=ancestor::tr')
      .locator('td')
      .first()
    const zoneName = await zoneNameElement.textContent()

    await firstViewButton.click()
    await page.waitForURL(`/en/zones/${zoneId}`)
    await page.waitForLoadState('networkidle')

    const deleteButton = page.getByTestId('delete-zone-button')
    await deleteButton.click()

    await page.waitForURL(new RegExp(`/en/zones/${zoneId}/delete`))
    await page.waitForLoadState('networkidle')

    const deleteApiPromise: Promise<Response> = page.waitForResponse(
      (response: Response): boolean =>
        response.url().includes(`/api/v1/zones/${zoneId}`) &&
        response.request().method() === 'DELETE'
    )

    const confirmButton = page.getByTestId('confirm-delete-zone-button')
    await confirmButton.click()

    await deleteApiPromise

    await page.waitForURL(/\/en\/zones$/, { timeout: 5000 })
    await page.waitForLoadState('networkidle')

    const deletedZoneButton = page.locator(`[data-testid="view-zone-${zoneId}"]`)
    await expect(deletedZoneButton).not.toBeVisible({ timeout: 5000 })

    if (zoneName) {
      const zoneNameInList = page.locator(`text=${zoneName}`)
      await expect(zoneNameInList).not.toBeVisible({ timeout: 5000 })
    }
  })
})
