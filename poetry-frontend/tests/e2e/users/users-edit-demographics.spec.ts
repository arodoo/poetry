/*
 * File: users-edit-demographics.spec.ts
 * Purpose: E2E test to verify saving and loading of demographics and address.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { getUserIdFromButton } from './users-list-helpers'

test('user edit form correctly loads new demographic and address fields', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)

  // 1. Go to users list and pick the first user
  await page.goto('/en/users')
  await page.waitForLoadState('load')

  const viewButton: Locator = page
    .locator('[data-testid^="view-user-"]')
    .first()
  await expect(viewButton).toBeVisible({ timeout: 15000 })
  const userId: string = await getUserIdFromButton(viewButton, 'view-user-')
  await viewButton.click()
  await page.waitForLoadState('load')

  // 2. Go to Edit
  const editButton: Locator = page.getByTestId('edit-user-button')
  await expect(editButton).toBeVisible({ timeout: 15000 })
  await editButton.click()
  await expect(page).toHaveURL(new RegExp(`/en/users/${userId}/edit$`))
  await page.waitForLoadState('load')

  // 3. Fill in Demographics & Address
  const testPhone = '555-123-4567'
  const testCity = 'Springfield'
  const testCountry = 'USA'
  const testBirthDate = '1990-05-20'
  const testGender = 'female'
  const testLine1 = '123 Fake Street'
  const testLine2 = 'Apt 4B'
  const testState = 'IL'
  const testZip = '62701'

  await page.getByTestId('user-phone-input').fill(testPhone)
  await page.getByTestId('user-birthdate-input').fill(testBirthDate)
  await page.getByTestId('user-gender-select').selectOption(testGender)
  await page.getByTestId('user-address-line1-input').fill(testLine1)
  await page.getByTestId('user-address-line2-input').fill(testLine2)
  await page.getByTestId('user-address-city-input').fill(testCity)
  await page.getByTestId('user-address-state-input').fill(testState)
  await page.getByTestId('user-address-zip-input').fill(testZip)
  await page.getByTestId('user-address-country-input').fill(testCountry)

  // 4. Save
  const saveButton = page.getByRole('button', { name: 'Save' })
  await expect(saveButton).toBeVisible()
  await saveButton.click()

  // 5. Wait for redirect back to detail page and success msg
  await expect(page).toHaveURL(new RegExp(`/en/users/${userId}$`))
  await page.waitForLoadState('load')

  // 6. Go to Edit AGAIN to verify fields loaded properly
  await expect(editButton).toBeVisible({ timeout: 15000 })
  await editButton.click()
  await expect(page).toHaveURL(new RegExp(`/en/users/${userId}/edit$`))
  await page.waitForLoadState('load')

  // 7. Assert values are prefilled
  await expect(page.getByTestId('user-phone-input')).toHaveValue(testPhone)
  await expect(page.getByTestId('user-birthdate-input')).toHaveValue(
    testBirthDate
  )
  await expect(page.getByTestId('user-gender-select')).toHaveValue(testGender)
  await expect(page.getByTestId('user-address-line1-input')).toHaveValue(
    testLine1
  )
  await expect(page.getByTestId('user-address-line2-input')).toHaveValue(
    testLine2
  )
  await expect(page.getByTestId('user-address-city-input')).toHaveValue(
    testCity
  )
  await expect(page.getByTestId('user-address-state-input')).toHaveValue(
    testState
  )
  await expect(page.getByTestId('user-address-zip-input')).toHaveValue(testZip)
  await expect(page.getByTestId('user-address-country-input')).toHaveValue(
    testCountry
  )

  // Teardown (optional, clear the fields)
  await page.getByTestId('user-phone-input').fill('')
  await page.getByTestId('user-address-line1-input').fill('')
  await page.getByTestId('user-address-line2-input').fill('')
  await page.getByTestId('user-address-city-input').fill('')
  await page.getByTestId('user-address-state-input').fill('')
  await page.getByTestId('user-address-zip-input').fill('')
  await page.getByTestId('user-address-country-input').fill('')
  await saveButton.click()
})
