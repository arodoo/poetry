/*
 * File: membership-detail-edit-navigation.spec.ts
 * Purpose: E2E test verifying edit button navigation on
 * membership detail page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Membership Detail Edit Navigation', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('edit button navigates to edit page', async ({
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

    const editButton: Locator = page.getByTestId('edit-membership-button')
    await editButton.waitFor({ state: 'visible', timeout: 5000 })
    await editButton.click()

    await page.waitForURL(`/en/memberships/${membershipId}/edit`)
    await expect(page).toHaveURL(`/en/memberships/${membershipId}/edit`)
  })
})
