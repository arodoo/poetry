/*
 * File: useRegister.ts
 * Purpose: Expose a typed TanStack Query mutation for public registration.
 *          The hook keeps side-effects out of the API wrapper and provides a
 *          typed surface for pages to call.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { registerRequest } from '../api/publicRegisterApi'
import type { RegisterForm } from '../model/PublicRegisterSchemas'

function generateIdempotencyKey(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (c: string): string => {
      const r: number = (Math.random() * 16) | 0
      const v: number = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    }
  )
}

export function useRegister(): UseMutationResult<unknown, Error, RegisterForm> {
  async function mutationFn(payload: RegisterForm): Promise<unknown> {
    return registerRequest(payload, generateIdempotencyKey())
  }

  return useMutation<unknown, Error, RegisterForm>({ mutationFn })
}
