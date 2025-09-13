/*
 File: post.ts
 Purpose: Send client log payloads to the dev server plugin using
 navigator.sendBeacon when available, falling back to fetch. The module
 also provides a clearLog helper to truncate the log file on reload,
 ensuring each session starts clean.
 All Rights Reserved. Arodi Emmanuel
*/
export function post(payload: unknown): void {
  const body: string = JSON.stringify(payload)
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
}

export function clearLog(): void {
  try {
    navigator.sendBeacon('/__clear-log', new Blob([], { type: 'text/plain' }))
  } catch {
    void fetch('/__clear-log', {
      method: 'POST',
      keepalive: true,
    }).catch((): void => {
      /* noop */
    })
  }
}
