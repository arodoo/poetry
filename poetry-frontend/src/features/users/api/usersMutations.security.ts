/*
 * File: usersMutations.security.ts
 * Purpose: User security mutation (password update).
 * Placeholder for future backend implementation.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UserResponse } from '../../../api/generated'
import {
  UpdateUserSecuritySchema,
  type UpdateUserSecurityInput,
} from '../model/UsersSchemas'

export async function updateUserSecurity(
  id: string,
  input: UpdateUserSecurityInput,
  _etag?: string
): Promise<UserResponse> {
  UpdateUserSecuritySchema.parse(input)
  void _etag
  const msg = `Password update not yet implemented for user ${id}`
  return Promise.reject(new Error(msg))
}
