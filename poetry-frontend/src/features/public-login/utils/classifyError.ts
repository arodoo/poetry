/*
 * File: classifyError.ts
 * Purpose: Small helper to classify error messages for login flow.
 * All Rights Reserved. Arodi Emmanuel
 */
export function classifyError(msg: string): string {
  const invalidMsg: string = 'Invalid username or password'
  const networkMsg: string = 'Network error. Please try again.'
  const serverMsg: string = 'Server error. Please try again.'
  const genericMsg: string = 'Login failed. Please try again.'

  if (msg.includes('401') || msg.includes('unauthorized')) return invalidMsg
  if (msg.includes('Network') || msg.includes('fetch')) return networkMsg
  if (msg.includes('500')) return serverMsg
  return genericMsg
}
