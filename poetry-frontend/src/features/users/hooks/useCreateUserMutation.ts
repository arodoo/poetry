/*
 * File: useCreateUserMutation.ts
 * Purpose: Mutation hook for creating admin users.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { createUser } from '../api/usersApi'
import type { CreateUserInput, UserDetail } from '../model/UsersSchemas'
import { useUsersMutationSuccess } from './useUsersMutationHelpers'

export function useCreateUserMutation(): UseMutationResult<
  UserDetail,
  unknown,
  CreateUserInput
> {
  const onSuccess: (detail: UserDetail) => void = useUsersMutationSuccess()
  return useMutation({
    mutationFn: createUser,
    onSuccess,
  })
}
