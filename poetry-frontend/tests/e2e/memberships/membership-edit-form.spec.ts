/*
 * File: membership-edit-form.spec.ts
 * Purpose: E2E test for membership edit form verifying form loads
 * with data fields are editable save triggers API shows toast.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import {
  seedMembership,
  deleteMembership,
  type SeedMembership,
} from '../shared/fixtures/seedApi'

test.describe('Membership Edit Form', (): void => {
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

  test('edit form loads updates saves shows toast', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto(`/en/memberships/${m.id}`)
    await expect(
      page.getByTestId('edit-membership-button')
    ).toBeVisible({ timeout: 10000 })

    await page.getByTestId('edit-membership-button').click()
    await page.waitForURL(`/en/memberships/${m.id}/edit`)

    await expect(
      page.getByRole('heading', { name: /Edit/i })
    ).toBeVisible()

    const sellerCodeInput = page.getByTestId(
      'membership-seller-code-input'
    )
    await expect(sellerCodeInput).toBeVisible()

    await sellerCodeInput.clear()
    await sellerCodeInput.fill('codigo001')
    await page.waitForTimeout(500)

    const saveButton = page.getByRole('button', {
      name: /Save changes/i,
    })
    await saveButton.click()

    await expect(
      page.getByText(/Membership updated/i)
    ).toBeVisible({ timeout: 10000 })

    await page.waitForURL('/en/memberships', { timeout: 10000 })
  })
})
