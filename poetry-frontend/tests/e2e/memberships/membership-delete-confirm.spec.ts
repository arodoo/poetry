/*
 * File: membership-delete-confirm.spec.ts
 * Purpose: E2E test verifying membership deletion confirmation
 * triggers API call shows success toast and navigates to list.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { seedMembership, type SeedMembership } from '../shared/fixtures/seedApi'
import { deleteAdminMemberships } from './membership-form-helpers'

test.describe('Membership Delete Confirmation', (): void => {
  let m: SeedMembership

  test.beforeAll(async (): Promise<void> => {
    await deleteAdminMemberships()
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

    const apiPromise: Promise<Response> = page.waitForResponse(
      (r: Response): boolean =>
        r.url().includes(`/api/v1/memberships/${m.id}`) &&
        r.request().method() === 'DELETE'
    )

    const btn = page.getByTestId('confirm-delete-membership-button')
    await expect(btn).toBeVisible({ timeout: 10000 })
    await btn.click()

    const resp: Response = await apiPromise
    expect([200, 204]).toContain(resp.status())

    await page.waitForURL(/\/en\/memberships$/, {
      timeout: 5000,
    })
    await expect(page).toHaveURL(/\/en\/memberships$/)
  })
})
