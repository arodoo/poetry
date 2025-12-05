/*
 * File: useCreateUserMutation.ts
 * Purpose: Mutation hook for creating admin users.
 * Uses generated UserResponse type (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { createUser } from '../../api/usersApi'
import type { CreateUserInput } from '../../model/UsersSchemas'
import type { UserResponse } from '../../../../api/generated'
import { useUsersMutationSuccess } from './useUsersMutationHelpers'

export function useCreateUserMutation(): UseMutationResult<
  UserResponse,
  unknown,
  CreateUserInput
> {
  const onSuccess: (detail: UserResponse) => void = useUsersMutationSuccess()
  return useMutation({
    mutationFn: createUser,
    onSuccess,
  })
}
