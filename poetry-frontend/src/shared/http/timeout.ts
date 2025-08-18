/*
 File: timeout.ts
 Purpose: Small utilities for time control in HTTP flows. Provides an
 AbortSignal with a timeout and a delay helper used by retry logic.
 Keeps concerns isolated from the client to respect SRP. All Rights
 Reserved. Arodi Emmanuel
*/

export function createTimeout(
  timeoutMs: number,
  parent?: AbortSignal
): { signal: AbortSignal; clear: () => void } {
  const ctrl: AbortController = new AbortController()
  const onAbort: () => void = (): void => {
    ctrl.abort()
  }
  const timer: ReturnType<typeof setTimeout> = setTimeout((): void => {
    ctrl.abort()
  }, timeoutMs)
  if (parent) parent.addEventListener('abort', onAbort)
  const clear: () => void = (): void => {
    clearTimeout(timer)
    if (parent) parent.removeEventListener('abort', onAbort)
  }
  return { signal: ctrl.signal, clear }
}

export function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve: () => void): void => {
    setTimeout(resolve, ms)
  })
}
