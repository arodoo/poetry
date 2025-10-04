/*
 * File: useUpdateUserMutation.ts
 * Purpose: Mutation hook for updating admin user profile fields.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UseMutationResult } from '@tanstack/react-query'
import { updateUser } from '../api/usersApi'
import type { UpdateUserInput } from '../model/UsersSchemas'
import type { UserResponse } from '../../../api/generated'
import {
  type MutationVariables,
  useUsersEntityMutation,
} from './useUsersMutationHelpers'

export function useUpdateUserMutation(): UseMutationResult<
  UserResponse,
  unknown,
  MutationVariables<UpdateUserInput>
> {
  return useUsersEntityMutation(updateUser)
}
