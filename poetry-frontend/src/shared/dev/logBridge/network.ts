/*
 File: network.ts
 Purpose: Capture fetch/XHR errors and non-OK HTTP to dev log.
 All Rights Reserved. Arodi Emmanuel
*/
import { hookFetch } from './hooks/fetchHook'
import { hookXHR } from './hooks/xhrHook'

export function hookNetwork(): void {
  hookFetch()
  hookXHR()
}
