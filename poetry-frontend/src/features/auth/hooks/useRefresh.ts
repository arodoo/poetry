/*
 * File: useRefresh.ts
 * Purpose: Refresh token mutation extracted to keep files short.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { QueryClient, UseMutationResult } from '@tanstack/react-query'
import { postRefresh } from '../api/authApi'
import type { AuthTokens } from '../model/AuthTokensSchemas'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'

export function useRefresh(): UseMutationResult<AuthTokens, Error, string> {
  const qc: QueryClient = useQueryClient()

  async function refreshMutationFn(refreshToken: string): Promise<AuthTokens> {
    return postRefresh(refreshToken)
  }

  return useMutation<AuthTokens, Error, string>({
    mutationFn: refreshMutationFn,
    onSuccess: async (tokens: AuthTokens): Promise<void> => {
      tokenStorage.save(tokens)
      await qc.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
  })
}
