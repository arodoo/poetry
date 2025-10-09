/*
 * File: zones-edit.spec.ts
 * Purpose: E2E test for zones detail and edit functionality verifying
 * view navigation form loads saves data shows toast and navigates.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Zones Detail and Edit Flow', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('view zone details then edit: load data, save, toast, navigate', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/en/zones')
    await page.waitForLoadState('networkidle')

    await expect(
      page.getByRole('heading', { name: /Zones/i })
    ).toBeVisible({
      timeout: 10000,
    })

    const firstViewButton: Locator = page
      .locator('[data-testid^="view-zone-"]')
      .first()
    await expect(firstViewButton).toBeVisible({ timeout: 5000 })

    const testIdAttr: string | null =
      await firstViewButton.getAttribute('data-testid')
    const zoneId: string = testIdAttr?.replace('view-zone-', '') || ''
    expect(zoneId).toBeTruthy()

    await firstViewButton.click()
    await page.waitForURL(`/en/zones/${zoneId}`, { timeout: 10000 })
    await page.waitForLoadState('networkidle')

    await expect(
      page.getByRole('heading', { name: /Zone Details/i })
    ).toBeVisible({
      timeout: 10000,
    })

    const editButton: Locator = page.getByTestId('edit-zone-button')
    await expect(editButton).toBeVisible()

    const deleteButton: Locator = page.getByTestId('delete-zone-button')
    await expect(deleteButton).toBeVisible()

    await editButton.click()
    await page.waitForURL(`/en/zones/edit/${zoneId}`, { timeout: 10000 })
    await page.waitForLoadState('networkidle')

    await expect(
      page.getByRole('heading', { name: /Edit zone/i })
    ).toBeVisible({
      timeout: 10000,
    })

    const nameInput: Locator = page.getByTestId('zone-name-input')
    const descInput: Locator = page.getByTestId('zone-description-input')
    const managerSelect: Locator = page.getByTestId('seller-code-user-select')

    await expect(nameInput).toBeVisible()
    await expect(descInput).toBeVisible()
    await expect(managerSelect).toBeVisible()

    await page.waitForTimeout(1000)

    const originalName: string = (await nameInput.inputValue()) || ''
    expect(originalName).toBeTruthy()

    const updatedDesc = `Updated at ${Date.now()}`
    await descInput.fill(updatedDesc)

    const saveButton: Locator = page.getByRole('button', {
      name: /Save changes/i,
    })
    await expect(saveButton).toBeVisible()
    await saveButton.click()

    await expect(
      page.getByText(/Zone updated successfully/i)
    ).toBeVisible({
      timeout: 10000,
    })

    await page.waitForURL('/en/zones', { timeout: 10000 })

    await expect(
      page.getByRole('heading', { name: /Zones/i })
    ).toBeVisible()
  })
})
