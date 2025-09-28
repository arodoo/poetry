/*
 * File: useDashboardQueries.ts
 * Purpose: React Query hooks exposing dashboard read models with stable keys.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokenStorage'
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
  const hasAccessToken: boolean = Boolean(tokenStorage.load()?.accessToken)
  return useQuery<DashboardOverview>({
    queryKey: dashboardQueryKeys.overview(),
    queryFn: fetchDashboardOverview,
    staleTime: 1000 * 60,
    enabled: hasAccessToken,
    retry(failureCount: number, error: unknown): boolean {
      if (
        error instanceof Error &&
        (error.message.includes('HTTP 401') ||
          error.message.includes('HTTP 403'))
      )
        return false
      return failureCount < 2
    },
  })
}
