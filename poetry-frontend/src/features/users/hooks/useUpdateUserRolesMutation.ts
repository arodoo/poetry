/*
 * File: useUpdateUserRolesMutation.ts
 * Purpose: Mutation hook for updating admin user roles.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UseMutationResult } from '@tanstack/react-query'
import { updateUserRoles } from '../api/usersApi'
import type { UpdateUserRolesInput } from '../model/UsersSchemas'
import type { UserResponse } from '../../../api/generated'
import {
  type MutationVariables,
  useUsersEntityMutation,
} from './useUsersMutationHelpers'

export function useUpdateUserRolesMutation(): UseMutationResult<
  UserResponse,
  unknown,
  MutationVariables<UpdateUserRolesInput>
> {
  return useUsersEntityMutation(updateUserRoles)
}
