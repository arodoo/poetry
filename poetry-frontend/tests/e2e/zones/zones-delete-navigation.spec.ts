/*
 * File: zones-delete-navigation.spec.ts
 * Purpose: E2E test for navigating to zone delete confirmation page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Zones Delete Navigation', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('delete button navigates to confirmation page', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/en/zones')
    await page.waitForLoadState('networkidle')

    const firstViewButton = page.locator('[data-testid^="view-zone-"]').first()
    await firstViewButton.waitFor({ state: 'visible', timeout: 5000 })

    const testIdAttr = await firstViewButton.getAttribute('data-testid')
    const zoneId = testIdAttr?.replace('view-zone-', '') || ''

    await firstViewButton.click()
    await page.waitForURL(`/en/zones/${zoneId}`)
    await page.waitForLoadState('networkidle')

    const deleteButton = page.getByTestId('delete-zone-button')
    await deleteButton.waitFor({ state: 'visible', timeout: 5000 })
    await deleteButton.click()

    await page.waitForURL(new RegExp(`/en/zones/${zoneId}/delete`))
    await expect(page).toHaveURL(new RegExp(`/en/zones/${zoneId}/delete`))
  })
})
