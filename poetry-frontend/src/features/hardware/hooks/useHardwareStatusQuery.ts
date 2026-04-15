/*
 * File: useHardwareStatusQuery.ts
 * Purpose: React Query hook for hardware status with 30s polling.
 * Reduced from 5s to avoid unnecessary load. Manual controls
 * handle real-time scanner state changes via invalidation.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { getHardwareStatus } from '../api/hardwareApi'
import type { HardwareStatus } from '../model/hardwareStatusSchema'

const POLL_INTERVAL_MS = 30_000

export function useHardwareStatusQuery(): UseQueryResult<HardwareStatus> {
  return useQuery<HardwareStatus>({
    queryKey: ['hardware', 'status'],
    queryFn: getHardwareStatus,
    refetchInterval: POLL_INTERVAL_MS,
    refetchIntervalInBackground: false,
  })
}
