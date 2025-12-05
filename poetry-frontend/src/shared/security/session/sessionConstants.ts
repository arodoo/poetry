/*
 File: sessionConstants.ts
 Purpose: Shared constant results for useSession to keep stable object
 references and reduce file length in the main hook file.
 All Rights Reserved. Arodi Emmanuel
*/
import type { SessionHookResult } from './useSession.types'

export const unauthenticatedResult: SessionHookResult = {
  status: 'unauthenticated',
  session: null,
}

export const loadingResult: SessionHookResult = {
  status: 'loading',
  session: null,
}
