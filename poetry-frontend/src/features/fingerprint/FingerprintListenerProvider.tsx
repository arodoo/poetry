/*
 * File: FingerprintListenerProvider.tsx
 * Purpose: Global provider that runs the fingerprint listener loop.
 * Starts automatically when the user is authenticated, stops on logout.
 * Lives at the App root so banners appear regardless of the current page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useEffect, type ReactNode, type ReactElement } from 'react'
import { useSession } from '../../shared/security/session/useSession'
import { useListenerLoop } from './hooks/useListenerLoop'

export function FingerprintListenerProvider({
  children,
}: {
  children: ReactNode
}): ReactElement {
  const { status } = useSession()
  const { start, stop } = useListenerLoop()

  useEffect(() => {
    console.info('[FingerprintListener] status=', status)
    if (status === 'authenticated') {
      void start()
    } else {
      stop()
    }
    return stop
  }, [status, start, stop])

  return <>{children}</>
}
