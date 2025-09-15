/*
 * File: useForgot.ts
 * Purpose: Expose a typed TanStack Query mutation for forgot-password
 *          requests. Keeps side-effects out of API wrapper.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { forgotRequest } from '../api/publicForgotApi'
import type { ForgotForm } from '../model/PublicForgotSchemas'

export function useForgotPassword(): UseMutationResult<
  unknown,
  Error,
  ForgotForm
> {
  async function mutationFn(payload: ForgotForm): Promise<unknown> {
    return forgotRequest(payload)
  }

  return useMutation<unknown, Error, ForgotForm>({ mutationFn })
}
