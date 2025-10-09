/*
 * File: zones-delete-confirm.spec.ts
 * Purpose: E2E test for confirming zone deletion with API call.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Zones Delete Confirmation', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('confirm triggers API and shows success toast', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/en/zones')
    await page.waitForLoadState('networkidle')

    const firstViewButton = page.locator('[data-testid^="view-zone-"]').first()
    const testIdAttr = await firstViewButton.getAttribute('data-testid')
    const zoneId = testIdAttr?.replace('view-zone-', '') || ''

    await page.goto(`/en/zones/${zoneId}/delete`)
    await page.waitForLoadState('networkidle')

    const deleteApiPromise: Promise<Response> = page.waitForResponse(
      (response: Response): boolean =>
        response.url().includes(`/api/v1/zones/${zoneId}`) &&
        response.request().method() === 'DELETE'
    )

    const confirmButton = page.getByTestId('confirm-delete-zone-button')
    await confirmButton.click()

    const deleteResponse: Response = await deleteApiPromise
    
    if (deleteResponse.status() === 200 || deleteResponse.status() === 204) {
      await expect(
        page.getByText(/Zone deleted successfully/i)
      ).toBeVisible({
        timeout: 1000,
      })

      await page.waitForURL(/\/en\/zones$/, { timeout: 5000 })
      await expect(page).toHaveURL(/\/en\/zones$/)
    } else {
      const responseBody = await deleteResponse.text()
      throw new Error(
        `Delete failed with status ${deleteResponse.status()}: ${responseBody}`
      )
    }
  })
})
