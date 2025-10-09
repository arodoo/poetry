import type { Page, Response } from '@playwright/test'

export async function createTestSellerCode(
  page: Page
): Promise<{ id: string; code: string }> {
  await page.goto('/en/seller-codes/new')
  await page.waitForLoadState('networkidle')
  const timestamp: number = Date.now()
  const code = `DELTEST${String(timestamp)}`
  await page.getByTestId('seller-code-input').fill(code)
  await page.getByTestId('seller-code-org-input').fill('ORG-TEST')
  const userSelect = page.getByTestId('seller-code-user-select')
  await userSelect.waitFor({ state: 'visible', timeout: 10000 })
  await page.waitForTimeout(500)
  const options = userSelect.locator('option')
  const optionsCount: number = await options.count()
  let selected = false
  for (let i = 0; i < optionsCount; i += 1) {
    const opt = options.nth(i)
    const text = (await opt.textContent()) || ''
    const value = (await opt.getAttribute('value')) || ''
    if (text.toLowerCase().includes('admin') && value) {
      await userSelect.selectOption(value)
      selected = true
      break
    }
  }
  if (!selected) {
    await userSelect.selectOption({ index: 1 })
  }
  const createApiPromise: Promise<Response> = page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes('/api/v1/seller-codes') &&
      response.request().method() === 'POST'
  )
  await page.getByRole('button', { name: /create/i }).click()
  const createResponse: Response = await createApiPromise
  const data = (await createResponse.json()) as { id?: number }
  return { id: String(data.id ?? ''), code }
}
