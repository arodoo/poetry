/*
 * File: classifyError.ts
 * Purpose: Small helper to classify error messages for login flow.
 * All Rights Reserved. Arodi Emmanuel
 */
export function classifyError(msg: string): string {
  const invalidMsg = 'Invalid username or password'
  const networkMsg = 'Network error. Please try again.'
  const serverMsg = 'Server error. Please try again.'
  const genericMsg = 'Login failed. Please try again.'

  if (msg.includes('401') || msg.includes('unauthorized')) return invalidMsg
  if (msg.includes('Network') || msg.includes('fetch')) return networkMsg
  if (msg.includes('500')) return serverMsg
  return genericMsg
}
