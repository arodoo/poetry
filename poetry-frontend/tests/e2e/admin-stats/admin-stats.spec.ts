/*
 * File: admin-stats.spec.ts
 * Purpose: E2E tests for membership statistics API endpoint.
 * Verifies GET /api/v1/statistics/memberships returns correct format
 * with proper authentication via Bearer token.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { getAuthTokens } from '../shared/providers/tokenProvider'

const STATS_ENDPOINT = '/api/v1/statistics/memberships'

test.describe('Admin Statistics Endpoint', (): void => {
    test('API returns valid membership stats structure', async ({
        request,
    }): Promise<void> => {
        const tokens = await getAuthTokens()

        const response = await request.get(STATS_ENDPOINT, {
            headers: { Authorization: `Bearer ${tokens.accessToken}` },
            params: { expiringDays: 7 },
        })

        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body).toHaveProperty('active')
        expect(body).toHaveProperty('expiringSoon')
        expect(body).toHaveProperty('expired')
        expect(body).toHaveProperty('total')

        expect(typeof body.active).toBe('number')
        expect(typeof body.expiringSoon).toBe('number')
        expect(typeof body.expired).toBe('number')
        expect(typeof body.total).toBe('number')

        expect(body.active).toBeGreaterThanOrEqual(0)
        expect(body.total).toBeGreaterThanOrEqual(0)
    })

    test('API accepts custom expiringDays param', async ({
        request,
    }): Promise<void> => {
        const tokens = await getAuthTokens()

        const response = await request.get(STATS_ENDPOINT, {
            headers: { Authorization: `Bearer ${tokens.accessToken}` },
            params: { expiringDays: 14 },
        })

        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body).toHaveProperty('expiringSoon')
    })
})
