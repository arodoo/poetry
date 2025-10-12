/*
 * File: membership-delete-cancel.spec.ts
 * Purpose: E2E test verifying cancel button on membership delete
 * page navigates back to detail page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Membership Delete Cancel', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('cancel button returns to detail page', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/en/memberships')
    await page.waitForLoadState('networkidle')

    const firstViewButton = page
      .locator('[data-testid^="view-membership-"]')
      .first()
    const testIdAttr = await firstViewButton.getAttribute('data-testid')
    const membershipId = testIdAttr?.replace('view-membership-', '') || ''

    await page.goto(`/en/memberships/${membershipId}/delete`)
    await page.waitForLoadState('networkidle')

    const cancelButton = page.getByTestId('cancel-delete-membership-button')
    await cancelButton.waitFor({ state: 'visible', timeout: 5000 })
    await cancelButton.click()

    await page.waitForURL(`/en/memberships/${membershipId}`)
    await expect(page).toHaveURL(`/en/memberships/${membershipId}`)
  })
})
