/*
 File: useSession.types.ts
 Purpose: Isolated type definitions used by session-related helpers to avoid
 circular imports and keep files small.
 All Rights Reserved. Arodi Emmanuel
*/
export type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated'

export interface UserSession {
  userId: string
  roles: string[]
}

export interface SessionHookResult {
  status: SessionStatus
  session: UserSession | null
}
