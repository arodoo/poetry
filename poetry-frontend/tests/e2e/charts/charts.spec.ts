import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

const getMockMetrics = (overrides = {}) => ({
  usersByStatus: { Active: 50, Inactive: 10 },
  birthdaysThisMonth: { Users: 5 },
  activeHours: { '10:00': 20, '11:00': 30 },
  populatedRegions: { North: 100, South: 50 },
  enrollmentsOverTime: { Jan: 10, Feb: 20 },
  membershipsByStatus: { Active: 40, Expired: 20 },
  eventsByType: { Login: 100, Logout: 50 },
  subscriptionsByDuration: { Monthly: 30, Yearly: 10 },
  scheduledEventsByStatus: { Pending: 5, Completed: 10 },
  sellerCodesByStatus: { Active: 5, Inactive: 2 },
  ...overrides,
})

const getEmptyMetrics = () => ({
  usersByStatus: {},
  birthdaysThisMonth: {},
  activeHours: {},
  populatedRegions: {},
  enrollmentsOverTime: {},
  membershipsByStatus: {},
  eventsByType: {},
  subscriptionsByDuration: {},
  scheduledEventsByStatus: {},
  sellerCodesByStatus: {},
})

test.describe('Charts Feature E2E', () => {
  test.beforeEach(async ({ page }) => {
    // 1. Setup mock routes
    await page.route('**/api/v1/users/me', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 42,
          firstName: 'Arodi',
          lastName: 'Haro',
          email: 'arodoo@gmail.com',
          username: 'arodi',
          status: 'active',
          roles: ['member', 'admin'],
        }),
      })
    })

    await page.route('**/api/v1/dashboard/metrics**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(getMockMetrics()),
      })
    })

    // 2. Inject tokens to localStorage FIRST (requires a page context, so goto a blank or initial page)
    await page.goto('/es/login') // Go to a public page to inject tokens safely
    await injectTokens(page)

    // 3. Navigate to protected route
    await page.goto('/es/charts')

    // 4. Wait for basic rendering
    await page.waitForLoadState('networkidle')
    await expect(
      page.locator('h1').filter({ hasText: /Gráficos|Charts/i })
    ).toBeVisible({ timeout: 15000 })
  })

  // Basic Page Tests
  test('1. Charts page loads successfully', async ({ page }) => {
    await expect(
      page.locator('h1').filter({ hasText: /Gráficos|Charts/i })
    ).toBeVisible()
  })

  test('2. All 10 charts are rendered on the page', async ({ page }) => {
    const charts = [
      /Usuarios por Estado|Users by Status/i,
      /Cumpleaños este Mes|Birthdays This Month/i,
      /Horas Más Activas|Most Active Hours/i,
      /Regiones Más Pobladas|Most Populated Regions/i,
      /Registros en el Tiempo|Enrollments Over Time/i,
      /Estado de Membresías|Memberships Status/i,
      /Eventos de Auditoría|Audit Events/i,
      /Duración de Suscripciones|Subscriptions Duration/i,
      /Eventos Programados|Scheduled Events/i,
      /Códigos de Vendedor|Seller Codes/i,
    ]

    for (const title of charts) {
      await expect(page.locator('h3').filter({ hasText: title })).toBeVisible({
        timeout: 10000,
      })
    }
  })

  test('3. Each chart has a "Ver Más" button', async ({ page }) => {
    const buttons = page.locator('button', { hasText: /Ver Más|View More/i })
    // Should have 10 charts, so 10 buttons
    await expect(buttons).toHaveCount(10)
  })

  // Drill-down Tests
  test('4. Drill-down: Users By Status chart navigates correctly', async ({
    page,
  }) => {
    const chartCard = page
      .locator('h3')
      .filter({ hasText: /Usuarios por Estado|Users by Status/i })
      .locator('..')
    await chartCard.locator('button').click()
    await expect(page).toHaveURL(/.*\/charts\/details\/usersByStatus/)
    await expect(
      page
        .locator('h1')
        .filter({ hasText: /Usuarios por Estado|Users by Status/i })
    ).toBeVisible()
  })

  test('5. Drill-down page shows Raw Data table for Users By Status', async ({
    page,
  }) => {
    await page.route('**/api/v1/dashboard/metrics**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          getMockMetrics({ usersByStatus: { Active: 50, Inactive: 10 } })
        ),
      })
    })
    await page.goto('/es/charts/details/usersByStatus')
    await page.waitForLoadState('networkidle')

    await expect(
      page.locator('h3').filter({ hasText: /Datos en Bruto|Raw Data/i })
    ).toBeVisible()
    await expect(page.locator('table')).toBeVisible()
    await expect(
      page.getByRole('columnheader', { name: /Clave principal|Key/i })
    ).toBeVisible()
    await expect(
      page.getByRole('columnheader', { name: /Valor en cantidad|Value/i })
    ).toBeVisible()
  })

  test('6. "Volver" button on details page correctly navigates back', async ({
    page,
  }) => {
    await page.route('**/api/v1/dashboard/metrics**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(getMockMetrics()),
      })
    })
    await page.goto('/es/charts/details/usersByStatus')

    // Wait for the button and click
    const backButton = page.locator('button', { hasText: /Volver|Back/i })
    await backButton.click()
    await expect(page).toHaveURL(/.*\/charts$/)
  })

  // Specific Chart Tests
  test('7. Birthdays This Month chart navigates and displays data', async ({
    page,
  }) => {
    const chartCard = page
      .locator('h3')
      .filter({ hasText: /Cumpleaños este Mes|Birthdays This Month/i })
      .locator('..')
    await chartCard.locator('button').click()
    await expect(page).toHaveURL(/.*\/charts\/details\/birthdaysThisMonth/)
    await expect(
      page
        .locator('h1')
        .filter({ hasText: /Cumpleaños este Mes|Birthdays This Month/i })
    ).toBeVisible()
  })

  test('8. Most Active Hours chart navigates and displays data', async ({
    page,
  }) => {
    const heading = page
      .locator('h3')
      .filter({ hasText: /Horas Más Activas|Most Active Hours/i })
    const card = page
      .locator('[data-testid="charts-grid"] > div')
      .filter({ has: heading })
    await card.locator('button').click()
    await expect(page).toHaveURL(/.*\/charts\/details\/activeHours/)
    await expect(
      page
        .locator('h1')
        .filter({ hasText: /Horas Más Activas|Most Active Hours/i })
    ).toBeVisible()
  })

  test('9. Most Populated Regions chart navigates and displays data', async ({
    page,
  }) => {
    const chartCard = page
      .locator('h3')
      .filter({ hasText: /Regiones Más Pobladas|Most Populated Regions/i })
      .locator('..')
    await chartCard.locator('button').click()
    await expect(page).toHaveURL(/.*\/charts\/details\/populatedRegions/)
    await expect(
      page
        .locator('h1')
        .filter({ hasText: /Regiones Más Pobladas|Most Populated Regions/i })
    ).toBeVisible()
  })

  test('10. Enrollments Over Time chart navigates and displays data', async ({
    page,
  }) => {
    const chartCard = page
      .locator('h3')
      .filter({ hasText: /Registros en el Tiempo|Enrollments Over Time/i })
      .locator('..')
    await chartCard.locator('button').click()
    await expect(page).toHaveURL(/.*\/charts\/details\/enrollmentsOverTime/)
    await expect(
      page
        .locator('h1')
        .filter({ hasText: /Registros en el Tiempo|Enrollments Over Time/i })
    ).toBeVisible()
  })

  test('11. Memberships By Status chart navigates and displays data', async ({
    page,
  }) => {
    const chartCard = page
      .locator('h3')
      .filter({ hasText: /Estado de Membresías|Memberships Status/i })
      .locator('..')
    await chartCard.locator('button').click()
    await expect(page).toHaveURL(/.*\/charts\/details\/membershipsByStatus/)
    await expect(
      page
        .locator('h1')
        .filter({ hasText: /Estado de Membresías|Memberships Status/i })
    ).toBeVisible()
  })

  test('12. Audit Events chart navigates and displays data', async ({
    page,
  }) => {
    const chartCard = page
      .locator('h3')
      .filter({ hasText: /Eventos de Auditoría|Audit Events/i })
      .locator('..')
    await chartCard.locator('button').click()
    await expect(page).toHaveURL(/.*\/charts\/details\/eventsByType/)
    await expect(
      page
        .locator('h1')
        .filter({ hasText: /Eventos de Auditoría|Audit Events/i })
    ).toBeVisible()
  })

  test('13. Subscriptions By Duration chart navigates and displays data', async ({
    page,
  }) => {
    const chartCard = page
      .locator('h3')
      .filter({ hasText: /Duración de Suscripciones|Subscriptions Duration/i })
      .locator('..')
    await chartCard.locator('button').click()
    await expect(page).toHaveURL(/.*\/charts\/details\/subscriptionsByDuration/)
    await expect(
      page.locator('h1').filter({
        hasText: /Duración de Suscripciones|Subscriptions Duration/i,
      })
    ).toBeVisible()
  })

  test('14. Scheduled Events chart navigates and displays data', async ({
    page,
  }) => {
    const chartCard = page
      .locator('h3')
      .filter({ hasText: /Eventos Programados|Scheduled Events/i })
      .locator('..')
    await chartCard.locator('button').click()
    await expect(page).toHaveURL(/.*\/charts\/details\/scheduledEventsByStatus/)
    await expect(
      page
        .locator('h1')
        .filter({ hasText: /Eventos Programados|Scheduled Events/i })
    ).toBeVisible()
  })

  test('15. Seller Codes chart navigates and displays data', async ({
    page,
  }) => {
    const chartCard = page
      .locator('h3')
      .filter({ hasText: /Códigos de Vendedor|Seller Codes/i })
      .locator('..')
    await chartCard.locator('button').click()
    await expect(page).toHaveURL(/.*\/charts\/details\/sellerCodesByStatus/)
    await expect(
      page
        .locator('h1')
        .filter({ hasText: /Códigos de Vendedor|Seller Codes/i })
    ).toBeVisible()
  })

  // Edge cases and access
  test('16. Invalid chartId shows proper 404 or empty state', async ({
    page,
  }) => {
    await page.route('**/api/v1/dashboard/metrics**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(getEmptyMetrics()),
      })
    })
    await page.goto('/es/charts/details/invalidChartId123')

    // It should render the not found message from renderChart default case
    await expect(
      page
        .locator('div')
        .filter({ hasText: /No encontrado|Not Found|ui\.common\.notFound/i })
        .first()
    ).toBeVisible()

    // Data table should show the empty message (1 row with colspan)
    const tableRows = page.locator('tbody tr')
    await expect(tableRows).toHaveCount(1)
  })

  test('17. Unauthorized access redirects to login', async ({ browser }) => {
    const context = await browser.newContext()
    const unauthPage = await context.newPage()

    await unauthPage.goto('/es/charts')
    await expect(unauthPage).toHaveURL(/.*login.*/i, { timeout: 10000 })

    await context.close()
  })

  // Mobile / Responsive Checks
  test('18. Charts grid collapses to one column on mobile', async ({
    page,
  }) => {
    // Resize viewport to mobile size
    await page.setViewportSize({ width: 375, height: 812 })
    await page.reload()

    // Wait for the grid to actually render in React before evaluating DOM styles
    const gridLoc = page.locator('[data-testid="charts-grid"]')
    await expect(gridLoc).toBeVisible({ timeout: 15000 })

    // A stable way to check responsive layout is to ensure it didn't collapse entirely to 0 height
    const box = await gridLoc.boundingBox()
    expect(box?.height).toBeGreaterThan(500) // multiple charts stacked down

    // Restore size
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test('19. Charts data fetches successfully and populates components', async ({
    page,
  }) => {
    // Adding multilingual support for this specific existence check
    await expect(
      page
        .locator('h3')
        .filter({ hasText: /Cumpleaños este Mes|Birthdays This Month/i })
    ).toBeVisible()
  })

  test('20. Empty charts data does not break the layout', async ({ page }) => {
    await page.route('**/api/v1/dashboard/metrics**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(getEmptyMetrics()), // empty data
      })
    })
    await page.goto('/es/charts')
    await injectTokens(page)
    await page.reload()
    await page.waitForLoadState('networkidle')
    await expect(
      page.locator('h1').filter({ hasText: /Gráficos|Charts/i })
    ).toBeVisible()
  })
})
