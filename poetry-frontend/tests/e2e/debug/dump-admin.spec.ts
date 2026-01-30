import { test } from '@playwright/test'

test('dump admin-stats DOM and network', async ({ page, request }) => {
  // login via API
  const resp = await request.post('/api/v1/auth/login', {
    data: { username: 'admin', password: 'ChangeMe123!' },
  })
  if (!resp.ok()) {
    console.log('login failed', resp.status())
    return
  }
  const data = await resp.json()
  const token = data.accessToken
  await page.addInitScript(
    ([k, v]: [string, string]) => {
      localStorage.setItem(k, v)
    },
    [
      'poetry.auth.tokens',
      JSON.stringify({ accessToken: token, refreshToken: data.refreshToken }),
    ]
  )

  await page.goto('/en/admin/stats')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(1000)
  const pageEl = await page.$('[data-testid="admin-stats-page"]')
  if (!pageEl) {
    console.log('admin-stats-page not found')
  } else {
    const html = await pageEl.innerHTML()
    console.log('--- admin-stats-page HTML START ---')
    console.log(html.substring(0, 5000))
    console.log('--- admin-stats-page HTML END ---')
  }

  // list network responses briefly
  // (Playwright request context doesn't expose page network log here; rely on DOM)
})
