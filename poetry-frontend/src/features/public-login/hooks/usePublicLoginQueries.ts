/*
 * File: usePublicLoginQueries.ts
 * Purpose: React Query hooks for public login flow.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'
import { submitPublicLogin } from '../api/public-loginApi'
import {
  type PublicLoginRequest,
  type PublicLoginResult,
} from '../model/PublicLoginSchemas'

export const publicLoginKeys: {
  readonly root: readonly ['publicLogin']
  request(): readonly ['publicLogin', 'request']
} = {
  root: ['publicLogin'],
  request(): readonly ['publicLogin', 'request'] {
    return ['publicLogin', 'request'] as const
  },
}

export function usePublicLoginMutation(): UseMutationResult<
  PublicLoginResult,
  unknown,
  PublicLoginRequest
> {
  return useMutation({
    mutationKey: publicLoginKeys.request(),
    mutationFn: submitPublicLogin,
    onSuccess(result: PublicLoginResult): void {
      tokenStorage.save({
        accessToken: result.accessToken ?? '',
        refreshToken: result.refreshToken ?? '',
      })
    },
  })
}
