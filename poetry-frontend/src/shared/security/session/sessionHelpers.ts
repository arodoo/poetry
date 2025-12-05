/*
 File: sessionHelpers.ts
 Purpose: Small helpers used by useSession to keep the hook file short and
 focused. Extracted to satisfy line limits without changing behaviour.
 All Rights Reserved. Arodi Emmanuel
*/
import { tokenStorage, type TokenBundle } from './tokenStorage'

export function subscribeTokenStore(listener: () => void): () => void {
  return tokenStorage.subscribe(listener)
}

export function getTokenSnapshot(): TokenBundle | null {
  return tokenStorage.load()
}
