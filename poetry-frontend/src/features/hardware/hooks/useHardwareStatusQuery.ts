/*
 * File: useHardwareStatusQuery.ts
 * Purpose: React Query hook for hardware status with 5s polling.
 * Enables real-time reader status monitoring.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useQuery } from '@tanstack/react-query'
import { getHardwareStatus } from '../api/hardwareApi'
import type { HardwareStatus } from '../model/hardwareStatusSchema'

const POLL_INTERVAL_MS = 5000

export function useHardwareStatusQuery() {
  return useQuery<HardwareStatus>({
    queryKey: ['hardware', 'status'],
    queryFn: getHardwareStatus,
    refetchInterval: POLL_INTERVAL_MS,
    refetchIntervalInBackground: true,
  })
}
