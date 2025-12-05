/*
 * File: useLogin.ts
 * Purpose: Expose a typed TanStack Query mutation for public login.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { loginRequest } from '../api/publicLoginApi'
import type { LoginForm } from '../model/PublicLoginSchemas'
import type { AuthTokens } from '../../auth/model/AuthTokensSchemas'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'

export function useLogin(): UseMutationResult<AuthTokens, Error, LoginForm> {
  async function mutationFn(payload: LoginForm): Promise<AuthTokens> {
    return loginRequest(payload)
  }
  return useMutation<AuthTokens, Error, LoginForm>({
    mutationFn,
    onSuccess(tokens: AuthTokens): void {
      tokenStorage.save({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      })
    },
  })
}
