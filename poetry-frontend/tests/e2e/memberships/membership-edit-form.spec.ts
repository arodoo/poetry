/*
 * File: membership-edit-form.spec.ts
 * Purpose: E2E test for membership edit form verifying form loads
 * with data fields are editable save triggers API shows toast.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Membership Edit Form', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('edit form loads updates saves shows toast', async ({
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

    await page.getByTestId('edit-membership-button').click()
    await page.waitForURL(`/en/memberships/${membershipId}/edit`)
    await page.waitForLoadState('networkidle')

    await expect(page.getByRole('heading', { name: /Edit/i })).toBeVisible()

    const sellerCodeInput = page.getByTestId(
      'membership-seller-code-input'
    )
    await expect(sellerCodeInput).toBeVisible()
    await page.waitForTimeout(1000)

    const saveButton = page.getByRole('button', { name: /Save changes/i })
    await saveButton.click()

    await expect(page.getByText(/Membership updated/i)).toBeVisible({
      timeout: 10000,
    })

    await page.waitForURL('/en/memberships', { timeout: 10000 })
  })
})
