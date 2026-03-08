import {
  test,
  expect,
  type Page,
  type Locator,
  type Response,
} from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import {
  getUserIdFromButton,
  waitForUsersApiResponse,
} from './users-list-helpers'

test('create button navigates to new user page', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  const apiResponsePromise: Promise<Response> = waitForUsersApiResponse(page)
  await page.goto('/en/users')
  await apiResponsePromise

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
  const apiResponsePromise: Promise<Response> = waitForUsersApiResponse(page)
  await page.goto('/en/users')
  await apiResponsePromise
  const viewButton: Locator = page
    .locator('[data-testid^="view-user-"]')
    .first()
  await expect(viewButton).toBeVisible({ timeout: 15000 })
  const userId: string = await getUserIdFromButton(viewButton, 'view-user-')
  await viewButton.click()
  await expect(page).toHaveURL(new RegExp(`/en/users/${userId}$`))
  await expect(page.locator('section')).toBeVisible({ timeout: 15000 })
})
test('edit button navigates to user edit page', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  const apiResponsePromise: Promise<Response> = waitForUsersApiResponse(page)
  await page.goto('/en/users')
  await apiResponsePromise
  const viewButton: Locator = page
    .locator('[data-testid^="view-user-"]')
    .first()
  await expect(viewButton).toBeVisible({ timeout: 15000 })
  const userId: string = await getUserIdFromButton(viewButton, 'view-user-')
  await viewButton.click()
  const editButton: Locator = page.getByTestId('edit-user-button')
  await expect(editButton).toBeVisible({ timeout: 15000 })
  await editButton.click()
  await expect(page).toHaveURL(new RegExp(`/en/users/${userId}/edit$`))
  await expect(page.getByTestId('user-username-input')).toBeVisible()
})
