/*
 * File: users-list-navigation.spec.ts
 * Purpose: E2E tests for users list navigation actions.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { getUserIdFromButton } from './users-list-helpers'

test('create button navigates to new user page', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForLoadState('networkidle')
  const createButton: Locator = page.locator('a[href="/en/users/new"]')
  await expect(createButton).toBeVisible({ timeout: 15000 })
  await createButton.click()
  await expect(page).toHaveURL(/\/en\/users\/new/)
  await expect(page.getByTestId('user-username-input')).toBeVisible()
})
test('view button navigates to user detail page', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForLoadState('networkidle')
  const viewButton: Locator = page
    .locator('[data-testid^="view-user-"]')
    .first()
  await expect(viewButton).toBeVisible({ timeout: 15000 })
  const userId: string = await getUserIdFromButton(viewButton, 'view-user-')
  await viewButton.click()
  await expect(page).toHaveURL(new RegExp(`/en/users/${userId}$`))
})
test('edit button navigates to user edit page', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForLoadState('networkidle')
  const editButton: Locator = page
    .locator('[data-testid^="edit-user-"]')
    .first()
  await expect(editButton).toBeVisible({ timeout: 15000 })
  const userId: string = await getUserIdFromButton(editButton, 'edit-user-')
  await editButton.click()
  await expect(page).toHaveURL(new RegExp(`/en/users/${userId}/edit$`))
  await expect(page.getByTestId('user-username-input')).toBeVisible()
})
