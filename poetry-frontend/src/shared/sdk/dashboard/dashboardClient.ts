/*
 * File: dashboardClient.ts
 * Purpose: SDK helpers for dashboard endpoints using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */
import { overview } from '../../../api/generated'
import type { DashboardOverviewResponse } from '../../../api/generated'

export type { DashboardOverviewResponse }
export type DashboardOverviewDto = DashboardOverviewResponse

export async function getDashboardOverviewRaw(): Promise<DashboardOverviewResponse> {
  const response = await overview()
  if (response.error || !response.data) {
    throw new Error('Failed to fetch dashboard overview')
  }
  return response.data
}
