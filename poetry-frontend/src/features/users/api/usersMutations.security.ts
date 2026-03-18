/*
 * File: usersMutations.security.ts
 * Purpose: User security mutation (password update).
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UserResponse } from '../../../api/generated'
import {
  UpdateUserSecuritySchema,
  type UpdateUserSecurityInput,
} from '../model/UsersSchemas'
import { updateUserPassword } from '../../../api/generated/sdk.gen'

export async function updateUserSecurity(
  id: string,
  input: UpdateUserSecurityInput,
  etag?: string
): Promise<UserResponse> {
  const validated = UpdateUserSecuritySchema.parse(input)
  const options: Parameters<typeof updateUserPassword>[0] = {
    path: { id: Number(id) },
    body: { password: validated.password },
  }
  if (etag) {
    options.headers = { 'If-Match': etag }
  }
  await updateUserPassword(options)
  return {} as UserResponse
}
