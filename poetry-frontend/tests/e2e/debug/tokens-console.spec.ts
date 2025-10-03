/*
 File: tokens-console.spec.ts
 Purpose: Collect console logs and API request statuses for TokensProvider flow.
 All Rights Reserved. Arodi Emmanuel
*/
import { test, expect, type Page } from '@playwright/test'

test('TokensProvider fetch status and console', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  const consoleLogs: string[] = []
  const errors: string[] = []
  const failedRequests: { url: string; status: number }[] = []
  const allRequests: { url: string; status: number }[] = []

  page.on('console', (msg) => {
    consoleLogs.push(msg.text())
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('response', (response) => {
    const url: string = response.url()
    const status: number = response.status()
    if (url.includes('/api/v1/')) allRequests.push({ url, status })
    if (status === 403) failedRequests.push({ url, status })
  })

  await page.goto('http://localhost:5173/en/users', {
    waitUntil: 'networkidle',
  })
  await page.waitForTimeout(5000)

  console.log('All /api/v1/ requests:', allRequests)
  console.log('Failed HTTP 403 requests:', failedRequests)
  console.log('Console logs:', consoleLogs)
  console.log('Errors:', errors)

  expect(errors.length).toBe(0)
})
