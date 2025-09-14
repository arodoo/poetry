/*
 * File: useMe.ts
 * Purpose: Provide stable query key wrapper for 'me' query.
 * All Rights Reserved. Arodi Emmanuel
 */
import { getMe } from '../api/authApi'

export function useMe(): {
  key: readonly ['auth', 'me']
  query: () => Promise<unknown>
} {
  return {
    key: ['auth', 'me'] as const,
    query: getMe,
  }
}
