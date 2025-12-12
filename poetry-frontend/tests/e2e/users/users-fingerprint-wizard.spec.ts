/*
 * File: users-fingerprint-wizard.spec.ts
 * Purpose: E2E test verifying fingerprint wizard shows after user creation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.skip('fingerprint wizard appears after creating user', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  const consoleLogs: string[] = []
  page.on('console', (msg) => {
    consoleLogs.push(`${msg.type()}: ${msg.text()}`)
  })

  await injectTokens(page)
  await page.goto('/en/users/new', { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle')

  await expect(page.getByRole('heading', { name: 'Create user' })).toBeVisible()

  await page.getByTestId('user-firstname-input').fill('Test')
  await page.getByTestId('user-lastname-input').fill('Fingerprint')
  await page.getByTestId('user-username-input').fill('testfingerprint123')
  await page.getByTestId('user-email-input').fill('testfingerprint@example.com')

  await page.getByTestId('role-checkbox-admin').uncheck()
  await page.getByTestId('role-checkbox-manager').uncheck()
  await page.getByTestId('role-checkbox-user').check()
  await page.getByTestId('user-locale-select').selectOption('en')

  console.log('About to click submit button')
  await page.screenshot({ path: 'before-submit.png', fullPage: true })

  await page.getByRole('button', { name: /submit|create/i }).click()

  console.log('Clicked submit, waiting...')
  await page.waitForTimeout(5000)

  await page.screenshot({ path: 'after-submit.png', fullPage: true })

  const wizardExists = await page
    .getByText(/enroll fingerprint|start enrollment/i)
    .isVisible()
    .catch(() => false)

  if (!wizardExists) {
    console.log('WIZARD NOT FOUND - Taking screenshot...')
    console.log('Console logs from browser:')
    consoleLogs.forEach((log) => console.log(log))
    await page.screenshot({ path: 'wizard-not-found.png', fullPage: true })

    const pageContent = await page.content()
    console.log('Current URL:', page.url())
    console.log('Page title:', await page.title())
    console.log(
      'Has createdUserId in state?',
      pageContent.includes('createdUserId')
    )
  }

  expect(wizardExists).toBe(true)
})
