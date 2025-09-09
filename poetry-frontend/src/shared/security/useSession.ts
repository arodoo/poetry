/*
 File: useSession.ts
 Purpose: Provide current authenticated session shape (roles etc). Temporary
 placeholder until real auth integration is wired. Ensures role-based guards
 compile and are testable. All Rights Reserved. Arodi Emmanuel
*/
export interface UserSession {
  userId: string
  roles: string[]
}

// Temporary in-memory stub session (would be replaced by context/provider)
let currentSession: UserSession | null = {
  userId: 'demo',
  roles: ['admin'],
}

export function useSession(): UserSession | null {
  return currentSession
}

export function __setTestSession(session: UserSession | null): void {
  currentSession = session
}
