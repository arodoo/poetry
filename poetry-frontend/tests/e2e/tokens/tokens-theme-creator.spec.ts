/*
 * File: tokens-theme-creator.spec.ts
 * Purpose: E2E test verifying the Theme Creator form can create a new
 * theme via the backend API. Catches Bug #5 where no theme creation
 * UI existed.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Theme Creator', (): void => {
  test('creates a new theme via the form', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')

    const creator = page.getByTestId('theme-creator')
    await expect(creator).toBeVisible({ timeout: 10000 })

    const nameInput = page.getByTestId('theme-creator-name')
    await nameInput.fill('E2E Test Theme')

    const baseSelect = page.getByTestId('theme-creator-base')
    await baseSelect.selectOption({ index: 1 })

    const postPromise: Promise<Response> = page.waitForResponse(
      (r: Response): boolean =>
        r.url().includes('/api/v1/themes') && r.request().method() === 'POST',
      { timeout: 30000 }
    )

    await page.getByTestId('theme-creator-submit').click()
    const resp: Response = await postPromise
    expect(resp.status()).toBeLessThan(300)

    await expect(page.getByText(/theme created|tema creado/i)).toBeVisible({
      timeout: 10000,
    })

    await expect(nameInput).toHaveValue('')
  })
})
