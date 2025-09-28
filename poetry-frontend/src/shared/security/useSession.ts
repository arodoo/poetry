/*
 File: useSession.ts
 Purpose: Provide current authenticated session shape (roles etc). Temporary
 placeholder until real auth integration is wired. Ensures role-based guards
 compile and are testable. All Rights Reserved. Arodi Emmanuel
*/
import { tokenStorage } from './tokenStorage'

export interface UserSession {
  userId: string
  roles: string[]
}

const fallbackSession: UserSession = {
  userId: 'demo',
  roles: ['admin'],
}

let currentSession: UserSession | null = null

function hasValidTokens(): boolean {
  try {
    return Boolean(tokenStorage.load()?.accessToken)
  } catch (_error: unknown) {
    void _error
    return false
  }
}

export function useSession(): UserSession | null {
  if (!hasValidTokens()) return null
  return currentSession ?? fallbackSession
}

export function __setTestSession(session: UserSession | null): void {
  currentSession = session
}
