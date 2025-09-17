/*
 File: xhrHook.ts
 Purpose: Hook XHR to capture errors and non-OK HTTP to dev log.
 All Rights Reserved. Arodi Emmanuel
*/
import { hookXHROpen } from './xhrOpenHook'
import { hookXHRSend } from './xhrSendHook'

export function hookXHR(): void {
  hookXHROpen()
  hookXHRSend()
}
