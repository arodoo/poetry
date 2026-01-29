/**
 * File: useStatsQueries.ts
 * Purpose: React Query hooks using SDK generated functions.
 * Uses SDK client for API calls (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */

import { useQuery } from '@tanstack/react-query'
import { getMembershipStats } from '../../../api/generated'
import type { MembershipStatsResponse } from '../model/StatsSchemas'

export function useMembershipStatsQuery(expiringDays = 7) {
  return useQuery({
    queryKey: ['membership-stats', expiringDays],
    queryFn: async (): Promise<MembershipStatsResponse> => {
      const result = await getMembershipStats({
        query: { expiringDays },
      })
      if (result.error) {
        throw new Error('Failed to fetch membership stats')
      }
      return result.data as MembershipStatsResponse
    },
    staleTime: 60_000,
  })
}
