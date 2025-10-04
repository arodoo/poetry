/*
 * File: dashboardApi.test.ts
 * Purpose: Ensure dashboard API wrappers validate overview responses.
 * Tests now use generated SDK mocks from api/generated.
 * All Rights Reserved. Arodi Emmanuel
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as generatedSdk from '../../../../api/generated'
import { fetchDashboardOverview } from '../../../../features/dashboard'

const baseResponse = {
  totalPoems: 15,
  publishedPoems: 9,
  draftPoems: 6,
  activeMembers: 4,
  highlightKey: 'ui.dashboard.overview.highlight.default',
  lastUpdatedLabel: '2025-09-27 12:00',
}

describe('dashboardApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('parses overview payload from the sdk', async () => {
    vi.spyOn(generatedSdk, 'overview').mockResolvedValue({
      data: baseResponse,
      request: new Request('http://localhost/api/v1/dashboard/overview'),
      response: new Response(),
    })
    const overview = await fetchDashboardOverview()
    expect(overview.totalPoems).toBe(15)
  })

  it('throws when sdk returns inconsistent totals', async () => {
    vi.spyOn(generatedSdk, 'overview').mockResolvedValue({
      data: { ...baseResponse, totalPoems: 5 },
      request: new Request('http://localhost/api/v1/dashboard/overview'),
      response: new Response(),
    })
    await expect(fetchDashboardOverview()).rejects.toThrow()
  })
})
