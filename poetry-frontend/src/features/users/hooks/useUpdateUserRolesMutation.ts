/*
 * File: useUpdateUserRolesMutation.ts
 * Purpose: Mutation hook for updating admin user roles.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UseMutationResult } from '@tanstack/react-query'
import { updateUserRoles } from '../api/usersApi'
import type { UpdateUserRolesInput, UserDetail } from '../model/UsersSchemas'
import {
  type MutationVariables,
  useUsersEntityMutation,
} from './useUsersMutationHelpers'

export function useUpdateUserRolesMutation(): UseMutationResult<
  UserDetail,
  unknown,
  MutationVariables<UpdateUserRolesInput>
> {
  return useUsersEntityMutation(updateUserRoles)
}
