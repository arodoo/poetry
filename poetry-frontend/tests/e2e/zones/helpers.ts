/*
 * helpers.ts
 * Shared helper functions for zones E2E tests providing
 * reusable zone creation deletion and navigation utilities.
 * © 2025 Poetry Platform. All rights reserved.
 */

import type { Page, Locator } from '@playwright/test'

export interface ZoneData {
  id: string
  name: string
  description: string
}

export async function createTestZone(page: Page): Promise<ZoneData> {
  await page.goto('/en/zones/new')
  await page.waitForLoadState('networkidle')

  const timestamp = Date.now()
  const name = `TEST-ZONE-${timestamp}`
  const description = 'Test zone description'

  await page.getByTestId('zone-name-input').fill(name)
  await page.getByTestId('zone-description-input').fill(description)

  const managerSelect: Locator = page.locator('select').first()
  await managerSelect.waitFor({ state: 'visible', timeout: 10000 })
  await page.waitForTimeout(500)

  const options: Locator = managerSelect.locator('option')
  const optionsCount = await options.count()

  if (optionsCount > 1) {
    await managerSelect.selectOption({ index: 1 })
  }

  await page.getByRole('button', { name: /Create zone/i }).click()
  
  await page.waitForURL(/\/en\/zones$/, { timeout: 10000 })
  await page.waitForLoadState('networkidle')

  const nameCell = page.locator(`text=${name}`)
  await nameCell.waitFor({ state: 'visible', timeout: 5000 })
  const row = nameCell.locator('xpath=ancestor::tr')
  const editButton = row.locator('[data-testid^="edit-zone-"]')
  const dataTestId = await editButton.getAttribute('data-testid')
  const id = dataTestId ? dataTestId.replace('edit-zone-', '') : ''

  return { id, name, description }
}

export async function deleteZoneViaApi(
  page: Page,
  zoneId: string
): Promise<void> {
  await page.goto('/en/zones')
  await page.waitForLoadState('networkidle')
  
  const token = await page.evaluate(() => {
    const item = localStorage.getItem('poetry-tokens')
    return item ? JSON.parse(item).accessToken : null
  })

  // For freshly created zones, version is 0
  await page.request.delete(
    `http://localhost:8080/api/v1/zones/${zoneId}?version=0`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
}
