/*
 * File: dashboardClient.ts
 * Purpose: SDK helpers for dashboard endpoints built on the shared HTTP client.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createFetchClient } from '../http/fetchClient'
import { getEnv, type Env } from '../config/env'
import type { HttpOptions } from '../http/httpTypes'

export interface DashboardOverviewDto {
  readonly totalPoems: number
  readonly publishedPoems: number
  readonly draftPoems: number
  readonly activeMembers: number
  readonly highlightKey: string
  readonly lastUpdatedLabel: string
}

export interface DashboardSdk {
  getOverview(): Promise<DashboardOverviewDto>
}

export function createDashboardSdk(env: Env = getEnv()): DashboardSdk {
  const fetchJson: <T>(path: string, options?: HttpOptions) => Promise<T> =
    createFetchClient(env)
  return {
    getOverview(): Promise<DashboardOverviewDto> {
      return fetchJson<DashboardOverviewDto>('/api/v1/dashboard/overview')
    },
  }
}

const defaultDashboardSdk: DashboardSdk = createDashboardSdk()

export function getDashboardOverviewRaw(): Promise<DashboardOverviewDto> {
  return defaultDashboardSdk.getOverview()
}
