/*
 * File: membership-edit-cancel.spec.ts
 * Purpose: E2E test verifying cancel button on membership edit
 * form navigates back to detail page without saving.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Membership Edit Cancel', (): void => {
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

    const firstViewButton: Locator = page
      .locator('[data-testid^="view-membership-"]')
      .first()
    await expect(firstViewButton).toBeVisible({ timeout: 5000 })

    const testIdAttr: string | null =
      await firstViewButton.getAttribute('data-testid')
    const membershipId: string =
      testIdAttr?.replace('view-membership-', '') || ''

    await firstViewButton.click()
    await page.waitForURL(`/en/memberships/${membershipId}`)
    await page.waitForLoadState('networkidle')

    const editButton: Locator = page.getByTestId('edit-membership-button')
    await editButton.click()

    await page.waitForURL(`/en/memberships/${membershipId}/edit`)
    await page.waitForLoadState('networkidle')

    const cancelButton: Locator = page.getByRole('button', {
      name: /Cancel/i,
    })
    await expect(cancelButton).toBeVisible()
    await cancelButton.click()

    await page.waitForURL(`/en/memberships/${membershipId}`)
    await expect(page).toHaveURL(`/en/memberships/${membershipId}`)
  })
})
