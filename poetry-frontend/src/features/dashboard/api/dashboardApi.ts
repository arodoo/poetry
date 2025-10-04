/*
 * File: dashboardApi.ts
 * Purpose: Dashboard API wrappers using generated SDK with runtime validation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { overview as getDashboardOverviewSdk } from '../../../api/generated'
import {
  DashboardOverviewSchema,
  type DashboardOverview,
} from '../model/DashboardSchemas'

export async function fetchDashboardOverview(): Promise<DashboardOverview> {
  const response = await getDashboardOverviewSdk()
  const dto = response.data
  return DashboardOverviewSchema.parse(dto)
}
