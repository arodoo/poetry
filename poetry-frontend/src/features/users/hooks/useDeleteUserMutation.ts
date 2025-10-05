/*
 * File: useDeleteUserMutation.ts
 * Purpose: Mutation hook for deleting admin users.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UseMutationResult } from '@tanstack/react-query'
import { deleteUser } from '../api/usersApi'
import type { UserResponse } from '../../../api/generated'
import {
  type MutationVariables,
  useUsersEntityMutation,
} from './useUsersMutationHelpers'

export function useDeleteUserMutation(): UseMutationResult<
  UserResponse,
  unknown,
  MutationVariables<unknown>
> {
  return useUsersEntityMutation(deleteUser)
}
