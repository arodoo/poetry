/*
 * File: zones-edit.spec.ts
 * Purpose: E2E test for zones detail and edit functionality verifying
 * view navigation form loads saves data shows toast and navigates.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { seedZone, deleteZone, type SeedZone } from '../shared/fixtures/seedApi'

test.describe('Zones Detail and Edit Flow', (): void => {
  let zone: SeedZone

  test.beforeAll(async (): Promise<void> => {
    zone = await seedZone({ name: 'e2e-edit-zone' })
  })

  test.afterAll(async (): Promise<void> => {
    if (zone?.id) await deleteZone(zone.id).catch(() => {})
  })

  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('view zone details then edit: load data, save, toast, navigate', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/en/zones')
    await expect(page.getByRole('heading', { name: /Zones/i })).toBeVisible({
      timeout: 10000,
    })

    const viewButton: Locator = page.getByTestId(`view-zone-${zone.id}`)
    await expect(viewButton).toBeVisible({ timeout: 10000 })
    await viewButton.click()
    await page.waitForURL(`/en/zones/${zone.id}`, { timeout: 10000 })

    const editButton: Locator = page.getByTestId('edit-zone-button')
    await expect(editButton).toBeVisible()
    await editButton.click()
    await page.waitForURL(`/en/zones/edit/${zone.id}`, { timeout: 10000 })

    const descInput: Locator = page.getByTestId('zone-description-input')
    await expect(descInput).toBeVisible()
    await descInput.fill(`Updated at ${Date.now()}`)

    const saveButton: Locator = page.getByRole('button', {
      name: /Save changes/i,
    })
    await saveButton.click()

    await expect(page.getByText(/Zone updated successfully/i)).toBeVisible({
      timeout: 10000,
    })
    await page.waitForURL('/en/zones', { timeout: 10000 })
  })
})
