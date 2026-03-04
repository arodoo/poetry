/*
 * File: membership-delete-cancel.spec.ts
 * Purpose: E2E test verifying cancel button on membership delete
 * page navigates back to detail page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import {
  seedMembership,
  deleteMembership,
  type SeedMembership,
} from '../shared/fixtures/seedApi'

test.describe('Membership Delete Cancel', (): void => {
  let m: SeedMembership

  test.beforeAll(async (): Promise<void> => {
    m = await seedMembership()
  })

  test.afterAll(async (): Promise<void> => {
    if (m?.id) await deleteMembership(m.id).catch(() => {})
  })

  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('cancel button returns to detail page', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto(`/en/memberships/${m.id}/delete`)

    const cancelButton = page.getByTestId(
      'cancel-delete-membership-button'
    )
    await cancelButton.waitFor({ state: 'visible', timeout: 5000 })
    await cancelButton.click()

    await page.waitForURL(new RegExp(`/en/memberships/${m.id}$`))
    await expect(page).toHaveURL(
      new RegExp(`/en/memberships/${m.id}$`)
    )
  })
})
