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
    if (refreshToken) await postLogout(refreshToken)
    return undefined
  }

  async function onSettled(): Promise<void> {
    tokenStorage.clear()
    await qc.resetQueries({ queryKey: ['auth'] })
  }

  return useMutation<undefined>({
    mutationFn: logoutMutationFn,
    onSettled,
  })
}
