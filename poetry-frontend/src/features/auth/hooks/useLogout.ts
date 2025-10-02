/*
 * File: useLogout.ts
 * Purpose: Logout mutation extracted to keep files short.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { QueryClient, UseMutationResult } from '@tanstack/react-query'
import { postLogout } from '../api/authApi'
import { tokenStorage } from '../../../shared/security/tokenStorage'
import type { TokenBundle } from '../../../shared/security/tokenStorage'

export function useLogout(): UseMutationResult<undefined, Error, void> {
  const qc: QueryClient = useQueryClient()

  async function logoutMutationFn(): Promise<undefined> {
    const bundle: TokenBundle | null = tokenStorage.load()
    const refreshToken: string | undefined = bundle?.refreshToken
    // Clear eagerly so UI reacts instantly even if network stalls.
    tokenStorage.clear()
    try {
      if (refreshToken) {
        await postLogout(refreshToken)
      }
    } catch (err: unknown) {
      // Ignore logout network errors; tokens already cleared locally.
      void err
    }
    return undefined
  }

  async function onSettled(): Promise<void> {
    // Ensure no tokens remain (idempotent) then reset related queries.
    tokenStorage.clear()
    await Promise.all([
      qc.resetQueries({ queryKey: ['auth'] }),
      qc.resetQueries({ queryKey: ['auth', 'me'] }),
    ])
  }

  return useMutation<undefined>({ mutationFn: logoutMutationFn, onSettled })
}
