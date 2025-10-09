/*
 * File: users-edit-cancel.spec.ts
 * Purpose: E2E test for cancel button in user edit form navigating back
 * to detail page. All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { getUserIdFromButton } from './users-list-helpers'

test('cancel button in edit form navigates to detail page', async ({
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
  await page.waitForLoadState('networkidle')
  const editButton: Locator = page.getByTestId('edit-user-button')
  await expect(editButton).toBeVisible({ timeout: 15000 })
  await editButton.click()
  await expect(page).toHaveURL(new RegExp(`/en/users/${userId}/edit$`))
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('heading', { name: 'Edit user' })).toBeVisible({
    timeout: 15000,
  })
  const cancelButton: Locator = page.getByRole('button', { name: 'Cancel' })
  await expect(cancelButton).toBeVisible()
  await cancelButton.click()
  await expect(page).toHaveURL(new RegExp(`/en/users/${userId}$`))
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible({
    timeout: 15000,
  })
  await expect(page.getByText('Profile Information')).toBeVisible()
})
