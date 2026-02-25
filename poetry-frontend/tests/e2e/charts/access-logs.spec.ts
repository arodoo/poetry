import { test, expect } from '@playwright/test';
import { injectTokens, waitForFontLoaded } from '../shared/providers/tokenProvider';

const getMockMetrics = (overrides = {}) => ({
    usersByStatus: {},
    enrollmentsOverTime: {},           // Add missing prop
    membershipsByStatus: {},           // Add missing prop
    eventsByType: {},                  // Add missing prop
    subscriptionsByDuration: {},       // Add missing prop
    scheduledEventsByStatus: {},       // Add missing prop
    sellerCodesByStatus: {},           // Add missing prop
    populatedRegions: {},              // Add missing prop
    birthdaysThisMonth: {},
    activeHours: { "15": 10, "16": 20 },
    activeDaysOfWeek: { "1": 50, "2": 20 },
    accessLogTrend: { "2024-01-01": 5, "2024-01-02": 15 },
    recentAccessLogs: [
        { id: 101, userName: "Alice Smith", email: "alice@example.com", timestamp: "2024-02-23T15:00:00Z" },
        { id: 102, userName: "Bob Jones", email: "bob@example.com", timestamp: "2024-02-23T16:00:00Z" }
    ],
    ...overrides
});

test.describe('Access Logs Sub-Dashboard E2E', () => {

    test.beforeEach(async ({ page }) => {
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
            });
        });

        await page.route('**/api/v1/dashboard/metrics', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(getMockMetrics()),
            });
        });

        await injectTokens(page);
    });

    test('1. Renders ActiveHours Details View with By Hour Tab as default and KPIs', async ({ page }) => {
        await page.goto('http://localhost:5173/en/charts/details/activeHours');
        await waitForFontLoaded(page, 'inter');

        // Check tabs exist
        await expect(page.locator('button', { hasText: 'By Hour' })).toBeVisible();
        await expect(page.locator('button', { hasText: 'Busiest Days' })).toBeVisible();
        await expect(page.locator('button', { hasText: '7-Day Trend' })).toBeVisible();

        // Check KPIs by count value to avoid timezone-dependent string failures (e.g. 4 PM vs 10 AM)
        await expect(page.locator('p', { hasText: 'Peak Hour' })).toBeVisible();
        await expect(page.locator('p', { hasText: 'Busiest Day' })).toBeVisible();
        await expect(page.getByText(/\(20\)/)).toBeVisible();

        await expect(page.getByText(/\(50\)/)).toBeVisible();
    });

    test('2. Clicking Busiest Days tab renders the ActiveDaysChart', async ({ page }) => {
        await page.goto('http://localhost:5173/en/charts/details/activeHours');
        await waitForFontLoaded(page, 'inter');

        const tab = page.locator('button', { hasText: 'Busiest Days' });
        await tab.click();

        await expect(page.locator('h3', { hasText: 'Busiest Days' })).toBeVisible();
        // Check if the recharts container for SVG is in DOM
        await expect(page.locator('svg.recharts-surface').first()).toBeVisible();
    });

    test('3. Clicking 7-Day Trend tab renders the AccessLogTrendChart', async ({ page }) => {
        await page.goto('http://localhost:5173/en/charts/details/activeHours');
        await waitForFontLoaded(page, 'inter');

        const tab = page.locator('button', { hasText: '7-Day Trend' });
        await tab.click();

        await expect(page.locator('h3', { hasText: '7-Day Trend' })).toBeVisible();
        // Check if the specific dot or line from the trend chart appears
        await expect(page.locator('.recharts-line-curve').first()).toBeVisible();
    });

    test('4. Raw Data table renders with real user contextual data (top 50)', async ({ page }) => {
        await page.goto('http://localhost:5173/en/charts/details/activeHours');
        await waitForFontLoaded(page, 'inter');

        await expect(page.locator('h3', { hasText: 'Raw Data (Top 50)' })).toBeVisible();

        // Check Table headers
        await expect(page.locator('th', { hasText: 'Name' })).toBeVisible();
        await expect(page.locator('th', { hasText: 'Email' })).toBeVisible();
        await expect(page.locator('th', { hasText: 'Time' })).toBeVisible();

        // Check Table rows
        await expect(page.locator('td', { hasText: 'Alice Smith' })).toBeVisible();
        await expect(page.locator('td', { hasText: 'alice@example.com' })).toBeVisible();
        await expect(page.locator('td', { hasText: 'Bob Jones' })).toBeVisible();
    });

    test('5. Empty state handles recentAccessLogs gracefully', async ({ page }) => {
        await page.route('**/api/v1/dashboard/metrics', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(getMockMetrics({ recentAccessLogs: [] })),
            });
        });

        await page.goto('http://localhost:5173/en/charts/details/activeHours');
        await waitForFontLoaded(page, 'inter');

        // Name column doesn't have rows, only header
        const rows = page.locator('tbody tr');
        await expect(rows).toHaveCount(0);
    });

    test('6. Navigation Back button works to return to overview', async ({ page }) => {
        await page.goto('http://localhost:5173/en/charts/details/activeHours');
        await waitForFontLoaded(page, 'inter');

        const backBtn = page.locator('button', { hasText: 'Back' });
        await backBtn.click();

        await expect(page).toHaveURL('http://localhost:5173/en/charts');
    });

});
