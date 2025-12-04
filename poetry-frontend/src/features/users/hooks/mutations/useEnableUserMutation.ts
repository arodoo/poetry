/*
 * File: useEnableUserMutation.ts
 * Purpose: Mutation hook for enabling admin users.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UseMutationResult } from '@tanstack/react-query'
import { enableUser } from '../../api/usersApi'
import type { UserStatusToggleInput } from '../../model/UsersSchemas'
import type { UserResponse } from '../../../../api/generated'
import {
  type MutationVariables,
  useUsersEntityMutation,
} from './useUsersMutationHelpers'

export function useEnableUserMutation(): UseMutationResult<
  UserResponse,
  unknown,
  MutationVariables<UserStatusToggleInput>
> {
  return useUsersEntityMutation(enableUser)
}
