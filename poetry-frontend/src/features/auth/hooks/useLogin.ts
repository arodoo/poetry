/*
 * File: useLogin.ts
 * Purpose: Login mutation extracted to keep files short and comply with
 *          repository line/size limits.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { QueryClient, UseMutationResult } from '@tanstack/react-query'
import { postLogin } from '../api/authApi'
import type { AuthTokens } from '../model/AuthTokensSchemas'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'

export function useLogin(): UseMutationResult<
  AuthTokens,
  Error,
  { username: string; password: string }
> {
  const qc: QueryClient = useQueryClient()

  async function loginMutationFn(payload: {
    username: string
    password: string
  }): Promise<AuthTokens> {
    return postLogin(payload.username, payload.password)
  }

  return useMutation<AuthTokens, Error, { username: string; password: string }>(
    {
      mutationFn: loginMutationFn,
      onSuccess: async (tokens: AuthTokens): Promise<void> => {
        tokenStorage.save(tokens)
        await qc.invalidateQueries({ queryKey: ['auth', 'me'] })
      },
    }
  )
}
