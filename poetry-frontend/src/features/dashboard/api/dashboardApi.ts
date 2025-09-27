/*
 * File: dashboardApi.ts
 * Purpose: Dashboard API wrappers using SDK functions with runtime validation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { getDashboardOverviewRaw } from '../../../shared/sdk'
import {
  DashboardOverviewSchema,
  type DashboardOverview,
} from '../model/DashboardSchemas'

export async function fetchDashboardOverview(): Promise<DashboardOverview> {
  const dto: unknown = await getDashboardOverviewRaw()
  return DashboardOverviewSchema.parse(dto)
}
