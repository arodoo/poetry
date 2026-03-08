/*
 * File: zones-delete-cancel.spec.ts
 * Purpose: E2E test for canceling zone deletion.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { seedZone, deleteZone, type SeedZone } from '../shared/fixtures/seedApi'

test.describe('Zones Delete Cancel', (): void => {
  let zone: SeedZone

  test.beforeAll(async (): Promise<void> => {
    zone = await seedZone({ name: 'e2e-cancel-delete' })
  })

  test.afterAll(async (): Promise<void> => {
    if (zone?.id) await deleteZone(zone.id).catch(() => {})
  })

  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('cancel button navigates back to zone detail', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto(`/en/zones/${zone.id}/delete`)

    const cancelButton = page.getByTestId('cancel-delete-zone-button')
    await expect(cancelButton).toBeVisible({ timeout: 10000 })
    await cancelButton.click()

    await page.waitForURL(new RegExp(`/en/zones/${zone.id}$`))
    await expect(page).toHaveURL(new RegExp(`/en/zones/${zone.id}$`))
  })
})
