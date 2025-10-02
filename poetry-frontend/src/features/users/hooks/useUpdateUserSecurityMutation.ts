/*
 * File: useUpdateUserSecurityMutation.ts
 * Purpose: Mutation hook for updating admin user security payloads.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UseMutationResult } from '@tanstack/react-query'
import { updateUserSecurity } from '../api/usersApi'
import type { UpdateUserSecurityInput, UserDetail } from '../model/UsersSchemas'
import {
  type MutationVariables,
  useUsersEntityMutation,
} from './useUsersMutationHelpers'

export function useUpdateUserSecurityMutation(): UseMutationResult<
  UserDetail,
  unknown,
  MutationVariables<UpdateUserSecurityInput>
> {
  return useUsersEntityMutation(updateUserSecurity)
}
