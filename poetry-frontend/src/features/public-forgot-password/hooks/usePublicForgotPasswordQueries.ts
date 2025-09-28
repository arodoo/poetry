/*
 * File: usePublicForgotPasswordQueries.ts
 * Purpose: React Query hooks for public forgot-password flows.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { submitPublicForgotPassword } from '../api/public-forgot-passwordApi'
import {
  type PublicForgotPasswordRequest,
  type PublicForgotPasswordResult,
} from '../model/PublicForgotPasswordSchemas'

export const publicForgotPasswordKeys: {
  readonly root: readonly ['publicForgotPassword']
  request(): readonly ['publicForgotPassword', 'request']
} = {
  root: ['publicForgotPassword'],
  request(): readonly ['publicForgotPassword', 'request'] {
    return ['publicForgotPassword', 'request'] as const
  },
}

export function usePublicForgotPasswordMutation(): UseMutationResult<
  PublicForgotPasswordResult,
  unknown,
  PublicForgotPasswordRequest
> {
  return useMutation({
    mutationKey: publicForgotPasswordKeys.request(),
    mutationFn: submitPublicForgotPassword,
  })
}
