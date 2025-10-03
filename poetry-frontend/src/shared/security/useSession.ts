/*
 File: useSession.ts
 Purpose: Provide reactive session state derived from persisted tokens and the
 /auth/me endpoint. Handles expired tokens by clearing storage and exposing a
 status flag for route guards to react appropriately. All Rights Reserved.
 Arodi Emmanuel
*/
import { useEffect, useSyncExternalStore } from 'react'
import { HttpError } from '../http/clientCore/httpErrors'
import { useMeQuery } from '../../features/auth/hooks/useMe'
import type { TokenBundle } from './tokenStorage'
import { tokenStorage } from './tokenStorage'
import { subscribeTokenStore, getTokenSnapshot } from './sessionHelpers'
import type { SessionHookResult, UserSession } from './useSession.types'
import { unauthenticatedResult, loadingResult } from './sessionConstants'

export type { SessionHookResult, UserSession } from './useSession.types'

export function useSession(): SessionHookResult {
  const tokens: TokenBundle | null = useSyncExternalStore(
    subscribeTokenStore,
    getTokenSnapshot,
    getTokenSnapshot
  )
  const hasTokens: boolean = Boolean(tokens?.accessToken)

  const meQuery: ReturnType<typeof useMeQuery> = useMeQuery({
    enabled: hasTokens,
  })

  useEffect((): void => {
    if (!hasTokens) return
    if (meQuery.isError) {
      const error: unknown = meQuery.error
      if (error instanceof HttpError && error.status === 401) {
        tokenStorage.clear()
      }
    }
  }, [meQuery.isError, meQuery.error, hasTokens])

  if (!hasTokens) {
    return unauthenticatedResult
  }

  if (meQuery.isLoading || meQuery.isFetching) {
    return loadingResult
  }

  if (meQuery.isError || !meQuery.data) {
    return unauthenticatedResult
  }

  const { id, roles } = meQuery.data
  const session: UserSession = {
    userId: id,
    roles: [...roles],
  }

  return { status: 'authenticated', session }
}
