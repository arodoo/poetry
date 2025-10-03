/*
 File: initEnv.ts
 Purpose: Initialize environment validation and small dev-only
 monitors. This keeps `main.tsx` short and within line/char limits.
 All Rights Reserved. Arodi Emmanuel
*/
import { getEnv } from '../config/env'

export function initEnv(): void {
  // Dev-only: install client error bridge BEFORE any code that may throw
  if (import.meta.env.DEV) {
    // Ensure dev-only modules are loaded; use void to mark intentionally
    // un-awaited promises
    void import('../dev/clientErrorReporter')

    // Set up CSS variables health check monitor
    void import('../dev/cssVariablesHealthCheck').then(
      (module: { setupCssVariablesMonitor: () => void }): void => {
        module.setupCssVariablesMonitor()
      }
    )

    // Fail-fast: validate env at startup (bridge errors explicitly in dev)
    try {
      getEnv()
    } catch (e: unknown) {
      const err: Error = e instanceof Error ? e : new Error(String(e))
      const body: string = JSON.stringify({
        type: 'startup-throw',
        name: err.name,
        message: err.message,
        stack: err.stack,
      })

      try {
        navigator.sendBeacon(
          '/__client-errors',
          new Blob([body], { type: 'application/json' })
        )
      } catch {
        void fetch('/__client-errors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true,
        }).catch((): void => {
          /* noop */
        })
      }

      throw e
    }
  } else {
    getEnv()
  }
}
