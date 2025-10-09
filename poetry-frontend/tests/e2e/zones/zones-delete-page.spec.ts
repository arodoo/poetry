/*
 * File: zones-delete-page.spec.ts
 * Purpose: E2E test for zone delete confirmation page UI elements.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Zones Delete Confirmation Page', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('displays heading and action buttons', async ({
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

    const heading = page.getByRole('heading', { name: /delete/i, level: 1 })
    await expect(heading).toBeVisible()

    const confirmButton = page.getByTestId('confirm-delete-zone-button')
    await expect(confirmButton).toBeVisible()

    const cancelButton = page.getByTestId('cancel-delete-zone-button')
    await expect(cancelButton).toBeVisible()
  })
})
