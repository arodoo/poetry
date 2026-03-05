/*
 * File: users-edit-username-disabled.spec.ts
 * Purpose: E2E test verifying the username field is disabled in the
 * user edit form. Catches Bug #1 where editing username silently
 * fails because the backend DTO lacks the username field.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { getUserIdFromButton } from './users-list-helpers'

test('username field is disabled in user edit form', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForLoadState('load')

  const viewBtn: Locator = page
    .locator('[data-testid^="view-user-"]')
    .first()
  await expect(viewBtn).toBeVisible({ timeout: 15000 })
  const userId = await getUserIdFromButton(viewBtn, 'view-user-')
  await viewBtn.click()

  const editBtn: Locator = page.getByTestId('edit-user-button')
  await expect(editBtn).toBeVisible({ timeout: 15000 })
  await editBtn.click()

  await expect(page).toHaveURL(
    new RegExp(`/en/users/${userId}/edit$`)
  )

  const usernameInput: Locator = page.getByTestId(
    'user-username-input'
  )
  await expect(usernameInput).toBeVisible({ timeout: 10000 })
  await expect(usernameInput).toBeDisabled()
})
