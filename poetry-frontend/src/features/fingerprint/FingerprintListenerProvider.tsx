/*
 * File: FingerprintListenerProvider.tsx
 * Purpose: Global provider that runs the fingerprint listener loop.
 * Only starts when hardware scanner is active (not auto-start).
 * Polls scanner state and connects WebSocket only when scanning.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useEffect, type ReactNode, type ReactElement } from 'react'
import { useSession } from '../../shared/security/session/useSession'
import { useListenerLoop } from './hooks/useListenerLoop'
import { useHardwareScanningState } from '../hardware/hooks/useHardwareScanningState'

export function FingerprintListenerProvider({
  children,
}: {
  children: ReactNode
}): ReactElement {
  const { status } = useSession()
  const { start, stop } = useListenerLoop()
  const scanning = useHardwareScanningState()

  useEffect(() => {
    if (status === 'authenticated' && scanning) {
      void start()
    } else {
      stop()
    }
    return stop
  }, [status, scanning, start, stop])

  return <>{children}</>
}
