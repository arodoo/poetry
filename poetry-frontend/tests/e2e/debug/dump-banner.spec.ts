import { test } from '@playwright/test'

test('dump banner DOM after enrollment', async ({ page, request }) => {
  // login via request context
  const resp = await request.post('/api/v1/auth/login', {
    data: { username: 'admin', password: 'ChangeMe123!' },
  })
  const data = await resp.json()
  await page.addInitScript(
    (arg: string[]) => {
      localStorage.setItem(arg[0], arg[1])
    },
    [
      'poetry.auth.tokens',
      JSON.stringify({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }),
    ]
  )

  // Mock fingerprint enroll
  await page.route('**/api/v1/fingerprints/enroll', async (route) => {
    await route.fulfill({ json: { userId: 123, status: 'enrolled' } })
  })
  await page.route('**/api/v1/users/123', async (route) => {
    await route.fulfill({
      json: {
        id: 123,
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        status: 'active',
        roles: ['admin'],
      },
    })
  })
  await page.route('**/api/v1/memberships?**', async (route) => {
    await route.fulfill({
      json: {
        content: [{ id: 1, userId: 123, status: 'active', subscriptionId: 1 }],
        totalElements: 1,
      },
    })
  })

  await page.goto('/en/devtools/simulator')
  await page.waitForLoadState('networkidle')
  await page.getByRole('textbox').first().fill('MOCK_VALID_FMD_DATA')
  await page.getByRole('button', { name: 'Simulate Enrollment' }).click()
  await page.waitForTimeout(500)
  // Search for banner-related text
  const regCount = await page.locator('text=/Registration/i').count()
  const newRegCount = await page.locator('text=/New Registration/i').count()
  const emailCount = await page.locator('text=/test@example.com/i').count()
  console.log('Registration matches:', regCount)
  console.log('New Registration matches:', newRegCount)
  console.log('Email matches:', emailCount)
  if (regCount > 0) {
    const n = Math.min(10, regCount)
    for (let i = 0; i < n; i++) {
      // print outerHTML of matching elements
      const el = await page.locator('text=/Registration/i').nth(i)
      const outer = await el.evaluate((e) => (e as HTMLElement).outerHTML)
      console.log(`match ${i}:`, outer)
    }
  }
})
