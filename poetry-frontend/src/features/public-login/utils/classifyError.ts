/*
 * File: classifyError.ts
 * Purpose: Small helper to classify error messages for login flow.
 * All Rights Reserved. Arodi Emmanuel
 */
export function classifyError(msg: string): string {
  const invalidMsg = 'ui.publicLogin.error.invalid'
  const networkMsg = 'ui.publicLogin.error.network'
  const serverMsg = 'ui.publicLogin.error.server'
  const genericMsg = 'ui.publicLogin.error.generic'

  if (msg.includes('401') || msg.includes('unauthorized')) return invalidMsg
  if (msg.includes('Network') || msg.includes('fetch')) return networkMsg
  if (msg.includes('500')) return serverMsg
  return genericMsg
}
