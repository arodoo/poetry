/*
 * File: usersMutations.core.ts
 * Purpose: Core user mutation operations (create/update) split out from
 * usersMutations to reduce file length and satisfy lint max-lines rule.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  createUser as createUserSdk,
  updateUser as updateUserSdk,
  type UserResponse,
} from '../../../api/generated'
import {
  CreateUserSchema,
  UpdateUserRolesSchema,
  UpdateUserSchema,
  UpdateUserSecuritySchema,
  type CreateUserInput,
  type UpdateUserInput,
  type UpdateUserRolesInput,
  type UpdateUserSecurityInput,
} from '../model/UsersSchemas'

export async function createUser(
  input: CreateUserInput
): Promise<UserResponse> {
  const validatedInput: CreateUserInput = CreateUserSchema.parse(input)
  validatedInput.status ??= 'active'
  const response = await createUserSdk({ body: validatedInput })
  if (!response.data) {
    throw new Error('Failed to create user')
  }
  return response.data as UserResponse
}

export async function updateUser(
  id: string,
  input: UpdateUserInput,
  etag?: string
): Promise<UserResponse> {
  const payload: UpdateUserInput = UpdateUserSchema.parse(input)
  const response = await updateUserSdk({
    path: { id: Number(id) },
    body: payload,
    headers: { 'If-Match': etag ?? '""' },
  })
  if (!response.data) {
    throw new Error(`Failed to update user ${id}`)
  }
  return response.data as UserResponse
}

export async function updateUserRoles(
  id: string,
  input: UpdateUserRolesInput,
  etag?: string
): Promise<UserResponse> {
  const payload: UpdateUserRolesInput = UpdateUserRolesSchema.parse(input)
  const response = await updateUserSdk({
    path: { id: Number(id) },
    body: { roles: payload.roles },
    headers: { 'If-Match': etag ?? '""' },
  })
  if (!response.data) {
    throw new Error(`Failed to update user roles for ${id}`)
  }
  return response.data as UserResponse
}

export async function updateUserSecurity(
  id: string,
  input: UpdateUserSecurityInput,
  _etag?: string
): Promise<UserResponse> {
  // Keep function signature for future implementation. The input is validated
  // now to keep behavior consistent. This remains intentionally unimplemented.
  UpdateUserSecuritySchema.parse(input)
  void _etag
  return Promise.reject(
    new Error(
      `Password update endpoint not yet implemented in backend OpenAPI for user ${id}`
    )
  )
}
