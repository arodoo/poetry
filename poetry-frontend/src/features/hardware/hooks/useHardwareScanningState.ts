/*
 * File: useHardwareScanningState.ts
 * Purpose: Lightweight hook returning the scanning boolean from
 * the hardware status query. Used by FingerprintListenerProvider
 * to decide whether to connect the WebSocket.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useQuery } from '@tanstack/react-query'
import { getHardwareStatus } from '../api/hardwareApi'

export function useHardwareScanningState(): boolean {
  const { data } = useQuery({
    queryKey: ['hardware', 'status'],
    queryFn: getHardwareStatus,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
  })
  return data?.scanning ?? false
}
