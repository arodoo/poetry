/*
 * File: membership-edit-cancel.spec.ts
 * Purpose: E2E test verifying cancel button on membership edit
 * form navigates back to detail page without saving.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import {
  seedMembership,
  deleteMembership,
  type SeedMembership,
} from '../shared/fixtures/seedApi'

test.describe('Membership Edit Cancel', (): void => {
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
    await page.goto(`/en/memberships/${m.id}`)

    const editButton: Locator = page.getByTestId('edit-membership-button')
    await expect(editButton).toBeVisible({ timeout: 10000 })
    await editButton.click()

    await page.waitForURL(`/en/memberships/${m.id}/edit`)

    const cancelButton: Locator = page.getByRole('button', {
      name: /Cancel/i,
    })
    await expect(cancelButton).toBeVisible()
    await cancelButton.click()

    await page.waitForURL(`/en/memberships/${m.id}`)
    await expect(page).toHaveURL(new RegExp(`/en/memberships/${m.id}$`))
  })
})
