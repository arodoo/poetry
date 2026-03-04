/*
 * File: membership-detail-edit-navigation.spec.ts
 * Purpose: E2E test verifying edit button navigation on
 * membership detail page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import {
  seedMembership,
  deleteMembership,
  type SeedMembership,
} from '../shared/fixtures/seedApi'

test.describe('Membership Detail Edit Navigation', (): void => {
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

  test('edit button navigates to edit page', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto(`/en/memberships/${m.id}`)

    const editButton: Locator = page.getByTestId(
      'edit-membership-button'
    )
    await editButton.waitFor({ state: 'visible', timeout: 10000 })
    await editButton.click()

    await page.waitForURL(`/en/memberships/${m.id}/edit`)
    await expect(page).toHaveURL(`/en/memberships/${m.id}/edit`)
  })
})
