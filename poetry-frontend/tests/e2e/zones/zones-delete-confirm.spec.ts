/*
 * File: zones-delete-confirm.spec.ts
 * Purpose: E2E test for confirming zone deletion with API call.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { seedZone, type SeedZone } from '../shared/fixtures/seedApi'

test.describe('Zones Delete Confirmation', (): void => {
  let zone: SeedZone

  test.beforeAll(async (): Promise<void> => {
    zone = await seedZone({ name: 'e2e-confirm-del' })
  })

  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('confirm triggers API and shows success toast', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto(`/en/zones/${zone.id}/delete`)
    await expect(page.getByTestId('confirm-delete-zone-button')).toBeVisible({
      timeout: 10000,
    })

    const deleteApiPromise: Promise<Response> = page.waitForResponse(
      (response: Response): boolean =>
        response.url().includes(`/api/v1/zones/${zone.id}`) &&
        response.request().method() === 'DELETE'
    )

    await page.getByTestId('confirm-delete-zone-button').click()
    const deleteResponse: Response = await deleteApiPromise
    const status = deleteResponse.status()

    if (status === 200 || status === 204) {
      await expect(page.getByText(/Zone deleted successfully/i)).toBeVisible({
        timeout: 5000,
      })
      await page.waitForURL(/\/en\/zones$/, { timeout: 5000 })
    } else {
      const body = await deleteResponse.text()
      throw new Error(`Delete failed: ${status}: ${body}`)
    }
  })
})
