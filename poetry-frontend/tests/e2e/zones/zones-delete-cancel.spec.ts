/*
 * File: zones-delete-cancel.spec.ts
 * Purpose: E2E test for canceling zone deletion.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Zones Delete Cancel', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('cancel button navigates back to zone detail', async ({
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

    const cancelButton = page.getByTestId('cancel-delete-zone-button')
    await cancelButton.click()

    await page.waitForURL(new RegExp(`/en/zones/${zoneId}$`))
    await expect(page).toHaveURL(new RegExp(`/en/zones/${zoneId}$`))
  })
})
