/*
 * File: useDashboardQueries.ts
 * Purpose: React Query hooks exposing dashboard read models with stable keys.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchDashboardOverview } from '../api/dashboardApi'
import { type DashboardOverview } from '../model/DashboardSchemas'

export const dashboardQueryKeys: {
  readonly root: readonly ['dashboard']
  overview(): readonly ['dashboard', 'overview']
} = {
  root: ['dashboard'],
  overview(): readonly ['dashboard', 'overview'] {
    return ['dashboard', 'overview'] as const
  },
}

export function useDashboardOverviewQuery(): UseQueryResult<DashboardOverview> {
  return useQuery({
    queryKey: dashboardQueryKeys.overview(),
    queryFn: fetchDashboardOverview,
    staleTime: 1000 * 60,
  })
}
