/*
 * File: usePublicRegisterQueries.ts
 * Purpose: Placeholder hooks for public register feature.
 * All Rights Reserved. Arodi Emmanuel
 */
export function usePublicRegister(): {
  register: (payload: unknown) => Promise<unknown>
} {
  return {
    register: async (): Promise<unknown> => {
      // delegate to SDK/API in real implementation; placeholder here
      return Promise.resolve({})
    },
  }
}
/*
 * File: usePublicRegisterQueries.ts
 * Purpose: Expose TanStack Query mutation for public registration.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokenStorage'
import { submitPublicRegister } from '../api/public-registerApi'
import {
  type PublicRegisterRequest,
  type PublicRegisterResult,
} from '../model/PublicRegisterSchemas'

export const publicRegisterKeys: {
  readonly root: readonly ['publicRegister']
  request(): readonly ['publicRegister', 'request']
} = {
  root: ['publicRegister'],
  request(): readonly ['publicRegister', 'request'] {
    return ['publicRegister', 'request'] as const
  },
}

export function usePublicRegisterMutation(): UseMutationResult<
  PublicRegisterResult,
  unknown,
  PublicRegisterRequest
> {
  return useMutation({
    mutationKey: publicRegisterKeys.request(),
    mutationFn: submitPublicRegister,
    onSuccess(result: PublicRegisterResult): void {
      tokenStorage.save({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      })
    },
  })
}
