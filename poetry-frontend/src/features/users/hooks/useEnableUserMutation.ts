/*
 * File: useEnableUserMutation.ts
 * Purpose: Mutation hook for enabling admin users.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UseMutationResult } from '@tanstack/react-query'
import { enableUser } from '../api/usersApi'
import type { UserDetail, UserStatusToggleInput } from '../model/UsersSchemas'
import {
  type MutationVariables,
  useUsersEntityMutation,
} from './useUsersMutationHelpers'

export function useEnableUserMutation(): UseMutationResult<
  UserDetail,
  unknown,
  MutationVariables<UserStatusToggleInput>
> {
  return useUsersEntityMutation(enableUser)
}
