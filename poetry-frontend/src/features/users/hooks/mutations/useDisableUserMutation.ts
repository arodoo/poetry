/*
 * File: useDisableUserMutation.ts
 * Purpose: Mutation hook for disabling admin users.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UseMutationResult } from '@tanstack/react-query'
import { disableUser } from '../../api/usersApi'
import type { UserStatusToggleInput } from '../../model/UsersSchemas'
import type { UserResponse } from '../../../../api/generated'
import {
  type MutationVariables,
  useUsersEntityMutation,
} from './useUsersMutationHelpers'

export function useDisableUserMutation(): UseMutationResult<
  UserResponse,
  unknown,
  MutationVariables<UserStatusToggleInput>
> {
  return useUsersEntityMutation(disableUser)
}
