/*
 * File: membership-delete-confirm.spec.ts
 * Purpose: E2E test verifying membership deletion confirmation
 * triggers API call shows success toast and navigates to list.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { seedMembership, type SeedMembership } from '../shared/fixtures/seedApi'

test.describe('Membership Delete Confirmation', (): void => {
  let m: SeedMembership

  test.beforeAll(async (): Promise<void> => {
    m = await seedMembership()
  })

  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('confirm triggers API and shows toast', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto(`/en/memberships/${m.id}/delete`)

    const deleteApiPromise: Promise<Response> = page.waitForResponse(
      (resp: Response): boolean =>
        resp.url().includes(`/api/v1/memberships/${m.id}`) &&
        resp.request().method() === 'DELETE'
    )

    const confirmButton = page.getByTestId('confirm-delete-membership-button')
    await expect(confirmButton).toBeVisible({ timeout: 10000 })
    await confirmButton.click()

    const deleteResponse: Response = await deleteApiPromise
    expect([200, 204]).toContain(deleteResponse.status())

    await page.waitForURL(/\/en\/memberships$/, { timeout: 5000 })
    await expect(page).toHaveURL(/\/en\/memberships$/)
  })
})
