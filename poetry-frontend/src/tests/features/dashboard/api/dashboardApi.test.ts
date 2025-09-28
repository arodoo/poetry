/*
 * File: dashboardApi.test.ts
 * Purpose: Ensure dashboard API wrappers validate overview responses.
 * All Rights Reserved. Arodi Emmanuel
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as sdk from '../../../../shared/sdk'
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
    vi.spyOn(sdk, 'getDashboardOverviewRaw').mockResolvedValue(baseResponse)
    const overview = await fetchDashboardOverview()
    expect(overview.totalPoems).toBe(15)
  })

  it('throws when sdk returns inconsistent totals', async () => {
    vi.spyOn(sdk, 'getDashboardOverviewRaw').mockResolvedValue({
      ...baseResponse,
      totalPoems: 5,
    })
    await expect(fetchDashboardOverview()).rejects.toThrow()
  })
})
