/*
 * File: reload.ts
 * Purpose: Indirection for page reload to simplify testing by allowing
 * spies without touching the Location object.
 * All Rights Reserved. Arodi Emmanuel
 */
export function appReload(): void {
  window.location.reload()
}
