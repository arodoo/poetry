import type { Page, Response } from '@playwright/test'
import { selectOption, selectDifferentOption } from
  '../shared/helpers/searchableSelectHelper'

export async function createTestSellerCode(
  page: Page
): Promise<{ id: string; code: string }> {
  await page.goto('/en/seller-codes/new')
  await page.waitForLoadState('networkidle')
  const timestamp: number = Date.now()
  const code = `DELTEST${String(timestamp)}`
  await page.getByTestId('seller-code-input').fill(code)
  await page.getByTestId('seller-code-org-input').fill('ORG-TEST')
  const userTid = 'seller-code-user-select'
  await page.getByTestId(userTid).waitFor(
    { state: 'visible', timeout: 10000 }
  )
  await selectDifferentOption(page, userTid)
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
