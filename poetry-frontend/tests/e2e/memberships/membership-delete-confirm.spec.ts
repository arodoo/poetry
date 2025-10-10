/*
 * File: membership-delete-confirm.spec.ts
 * Purpose: E2E test verifying membership deletion confirmation
 * triggers API call shows success toast and navigates to list.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Membership Delete Confirmation', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('confirm triggers API and shows toast', async ({
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

    const deleteApiPromise: Promise<Response> = page.waitForResponse(
      (resp: Response): boolean =>
        resp.url().includes(`/api/v1/memberships/${membershipId}`) &&
        resp.request().method() === 'DELETE'
    )

    const confirmButton = page.getByTestId(
      'confirm-delete-membership-button'
    )
    await confirmButton.click()

    const deleteResponse: Response = await deleteApiPromise
    const status = deleteResponse.status()

    if (status === 200 || status === 204) {
      await expect(page.getByText(/Membership deleted/i)).toBeVisible({
        timeout: 1000,
      })
      await page.waitForURL(/\/en\/memberships$/, { timeout: 5000 })
      await expect(page).toHaveURL(/\/en\/memberships$/)
    } else {
      const body = await deleteResponse.text()
      throw new Error(`Delete failed: ${status}: ${body}`)
    }
  })
})
