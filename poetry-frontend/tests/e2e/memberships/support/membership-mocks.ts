import { type Page } from '@playwright/test'

export async function mockMembershipAPI(page: Page) {
    // 1. Users Mock
    await page.route(/\/api\/v1\/users\/paged/, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                content: [{ id: 1, username: 'admin', firstName: 'Admin', lastName: 'User' }],
                totalElements: 1, totalPages: 1, size: 10, number: 0,
            }),
        })
    })

    // 2. Memberships Mock (List/Create)
    await page.route(/\/api\/v1\/memberships(\?|\/paged|$)/, async (route) => {
        const url = route.request().url()
        const method = route.request().method()
        if (method === 'GET') {
            if (url.includes('/paged')) {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ content: [], totalElements: 0, totalPages: 0 }),
                })
            } else {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify([]),
                })
            }
        } else if (method === 'POST' || method === 'PUT') {
            await route.fulfill({
                status: method === 'POST' ? 201 : 200,
                contentType: 'application/json',
                body: JSON.stringify({ id: 100 }),
            })
        } else {
            await route.continue()
        }
    })

    // 3. Fingerprints Mock
    await page.route(/\/api\/v1\/fingerprints/, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([{ userId: 1, status: 'ACTIVE' }]),
        })
    })

    // 4. Subscriptions Mock
    await page.route(/\/api\/v1\/subscriptions/, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([{ id: 1, name: 'Gold Plan', price: 99, currency: 'USD' }]),
        })
    })

    // 5. Seller Codes Mock
    await page.route(/\/api\/v1\/seller-codes/, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                content: [{ id: 1, code: 'SC001', status: 'ACTIVE' }],
                totalElements: 1,
                totalPages: 1,
                currentPage: 0,
                pageSize: 10,
            }),
        })
    })

    // 6. Tokens Mock (Enterprise Schema Alignment)
    await page.route('**/api/v1/tokens', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                themes: [
                    {
                        key: 'amber',
                        label: 'Amber Theme',
                        colors: {
                            primary: '#fbbf24',
                            error: '#ef4444',
                            text: '#1f2937',
                            background: '#ffffff',
                            surface: '#f3f4f6'
                        }
                    }
                ],
                fonts: [
                    {
                        key: 'inter',
                        label: 'Inter',
                        weights: [400, 700]
                    }
                ],
                fontWeights: ['400', '700'],
                fontSizes: [
                    {
                        key: 'md',
                        label: 'Medium',
                        sizes: { md: '16px' }
                    }
                ],
                spacings: [
                    {
                        key: 'md',
                        label: 'Medium',
                        values: { md: '16px' }
                    }
                ],
                radius: [
                    {
                        key: 'md',
                        label: 'Medium',
                        values: { md: '8px' }
                    }
                ],
                shadows: [
                    {
                        key: 'md',
                        label: 'Medium',
                        values: { md: 'none' }
                    }
                ],
                current: {
                    theme: 'amber',
                    font: 'inter',
                    fontSize: 'md',
                    spacing: 'md',
                    radius: 'md',
                    shadow: 'md'
                }
            }),
        })
    })

    // 7. Themes Mock
    await page.route('**/api/v1/themes/*', async (route) => {
        if (route.request().method() === 'GET') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    key: 'amber',
                    label: 'Amber Theme',
                    colors: { primary: '#fbbf24' }
                }),
            })
        } else {
            await route.continue()
        }
    })

    // 8. Single Membership Mock (for Detail/Edit)
    await page.route(/\/api\/v1\/memberships\/\d+/, async (route) => {
        const method = route.request().method()
        if (method === 'GET') {
            await route.fulfill({
                status: 200,
                headers: {
                    ETag: 'W/"123"',
                    'Access-Control-Expose-Headers': 'ETag'
                },
                contentType: 'application/json',
                body: JSON.stringify({
                    id: 1,
                    userId: 1,
                    subscriptionId: 1,
                    sellerCode: 'SC001',
                    status: 'ACTIVE',
                    allZones: false,
                    zoneIds: []
                }),
            })
        } else if (method === 'PUT') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ id: 1 }),
            })
        } else {
            await route.continue()
        }
    })
}
