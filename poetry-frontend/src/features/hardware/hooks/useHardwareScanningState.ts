/*
 * File: useHardwareScanningState.ts
 * Purpose: Lightweight hook returning the scanning boolean from
 * the cached hardware status. It never triggers a fetch by
 * itself; it only reads whatever the hardware page already
 * loaded. This prevents the app-wide polling loop that blocked
 * the UI when no reader was connected.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useQuery } from '@tanstack/react-query'
import { getHardwareStatus } from '../api/hardwareApi'
import { HARDWARE_STATUS_KEY } from './useHardwareStatusQuery'

export function useHardwareScanningState(): boolean {
  const { data } = useQuery({
    queryKey: [...HARDWARE_STATUS_KEY],
    queryFn: getHardwareStatus,
    enabled: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: Infinity,
    retry: false,
  })
  return data?.scanning ?? false
}
