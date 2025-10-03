/*
 * File: dashboard-debug-session.spec.ts
 * Purpose: Debug session state after login to understand redirect issue.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, type Page } from '@playwright/test'

test.describe('Dashboard session debug', (): void => {
  test('logs session state after login', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    const logs: string[] = []

    page.on('console', (msg) => {
      logs.push(`[${msg.type()}] ${msg.text()}`)
    })

    page.on('response', async (response) => {
      const url = response.url()
      if (url.includes('/auth/me')) {
        const status = response.status()
        let body = ''
        try {
          body = JSON.stringify(await response.json())
        } catch {
          body = await response.text()
        }
        console.log(`/auth/me response: ${status} - ${body}`)
      }
      if (url.includes('/auth/login')) {
        const status = response.status()
        console.log(`/auth/login response: ${status}`)
      }
    })

    await page.goto('/en/login')

    await page.locator('input[name="username"]').fill('admin')
    await page.locator('input[name="password"]').fill('ChangeMe123!')
    await page.locator('button[type="submit"]').click()

    await page.waitForTimeout(5000)

    console.log('Current URL:', page.url())
    console.log('All console logs:')
    logs.forEach((log) => console.log(log))

    const tokens = await page.evaluate(() => {
      return localStorage.getItem('poetry.auth.tokens')
    })
    console.log('Tokens in localStorage:', tokens)
  })
})
