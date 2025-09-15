/*
 * File: useLogin.ts
 * Purpose: Expose a typed TanStack Query mutation for public login.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { loginRequest } from '../api/publicLoginApi'
import type { LoginForm } from '../model/PublicLoginSchemas'

export function useLogin(): UseMutationResult<unknown, Error, LoginForm> {
  async function mutationFn(payload: LoginForm): Promise<unknown> {
    return loginRequest(payload)
  }

  return useMutation<unknown, Error, LoginForm>({ mutationFn })
}
