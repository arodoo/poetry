/*
 * File: e2e.d.ts
 * Purpose: Declare a small ambient type for the E2E test flag used by
 * Playwright instrumentation so code can reference `window.__E2E__` without
 * unsafe casts across the codebase.
 * All Rights Reserved. Arodi Emmanuel
 */
declare global {
  interface Window {
    __E2E__?: boolean
  }
  // also allow referencing from globalThis in some contexts
  var __E2E__: boolean | undefined
}

export {}
