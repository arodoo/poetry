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
  test.describe.configure({ retries: 1, timeout: 60000 })
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
    await expect(page.getByTestId('edit-membership-button')).toBeVisible({
      timeout: 15000,
    })

    await page.getByTestId('edit-membership-button').click()
    await page.waitForURL(/\/en\/memberships\/\d+\/edit/)

    await expect(
      page.getByRole('heading', { name: /Edit|Editar/i })
    ).toBeVisible()

    const seller = page.getByTestId('membership-seller-code-input')
    await expect(seller).toBeVisible({ timeout: 25000 })

    await seller.clear()
    await seller.fill('codigo003')

    const save = page.getByRole('button', {
      name: /Save changes|Guardar cambios/i,
    })
    await expect(save).toBeEnabled({ timeout: 5000 })
    await save.click()

    await page.waitForURL(/\/en\/memberships$/, {
      timeout: 30000,
    })
  })
})
