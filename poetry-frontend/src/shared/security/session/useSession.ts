/*
 File: useSession.ts
 Purpose: Provide reactive session state derived from persisted tokens and the
 /auth/me endpoint. Handles expired tokens by clearing storage and exposing a
 status flag for route guards to react appropriately. All Rights Reserved.
 Arodi Emmanuel
*/
import { useEffect, useMemo, useSyncExternalStore } from 'react'
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
  const hasTokens = Boolean(tokens?.accessToken)

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

  const userId: string | undefined = meQuery.data?.id
  const userRoles: readonly string[] | undefined = meQuery.data?.roles

  const result: SessionHookResult = useMemo((): SessionHookResult => {
    if (!hasTokens) {
      return unauthenticatedResult
    }

    if (meQuery.isLoading || meQuery.isFetching) {
      return loadingResult
    }

    if (meQuery.isError || !userId || !userRoles) {
      return unauthenticatedResult
    }

    const session: UserSession = {
      userId,
      roles: userRoles as string[],
    }
    return { status: 'authenticated', session }
  }, [
    hasTokens,
    meQuery.isLoading,
    meQuery.isFetching,
    meQuery.isError,
    userId,
    userRoles,
  ])

  return result
}
