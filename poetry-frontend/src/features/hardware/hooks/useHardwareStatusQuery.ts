/*
 * File: useHardwareStatusQuery.ts
 * Purpose: React Query hook for reader status. Fetches ONCE on
 * mount and never polls automatically, so the app stays fully
 * responsive even without a reader attached. The Try Connect
 * button invalidates this key to re-probe on demand.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { getHardwareStatus } from '../api/hardwareApi'
import type { HardwareStatus } from '../model/hardwareStatusSchema'

export const HARDWARE_STATUS_KEY: readonly string[] = [
  'hardware',
  'status',
] as const

export function useHardwareStatusQuery(): UseQueryResult<HardwareStatus> {
  return useQuery<HardwareStatus>({
    queryKey: [...HARDWARE_STATUS_KEY],
    queryFn: getHardwareStatus,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: 'always',
    staleTime: Infinity,
    retry: false,
  })
}
