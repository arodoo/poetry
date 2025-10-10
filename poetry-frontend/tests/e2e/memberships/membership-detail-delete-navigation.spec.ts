/*
 * File: membership-detail-delete-navigation.spec.ts
 * Purpose: E2E test verifying delete button navigation on
 * membership detail page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Membership Detail Delete Navigation', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('delete button navigates to confirmation page', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/en/memberships')
    await page.waitForLoadState('networkidle')

    const firstViewButton: Locator = page
      .locator('[data-testid^="view-membership-"]')
      .first()
    await firstViewButton.waitFor({ state: 'visible', timeout: 5000 })

    const testIdAttr: string | null =
      await firstViewButton.getAttribute('data-testid')
    const membershipId: string =
      testIdAttr?.replace('view-membership-', '') || ''
    expect(membershipId).toBeTruthy()

    await firstViewButton.click()
    await page.waitForURL(`/en/memberships/${membershipId}`)
    await page.waitForLoadState('networkidle')

    const deleteButton: Locator = page.getByTestId(
      'delete-membership-button'
    )
    await deleteButton.waitFor({ state: 'visible', timeout: 5000 })
    await deleteButton.click()

    await page.waitForURL(`/en/memberships/${membershipId}/delete`)
    await expect(page).toHaveURL(`/en/memberships/${membershipId}/delete`)
  })
})
