/*
 * File: usersMutations.ts
 * Purpose: Mutation operations using generated SDK for admin users feature.
 * Returns generated UserResponse types directly (zero drift).
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
  type UserStatusToggleInput,
} from '../model/UsersSchemas'

export async function createUser(
  input: CreateUserInput
): Promise<UserResponse> {
  const validatedInput: CreateUserInput = CreateUserSchema.parse(input)
  // prefer nullish coalescing to avoid overriding falsy but valid values
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
  // Reference _etag to avoid unused var lint; function intentionally unimplemented
  void _etag
  return Promise.reject(
    new Error(
      `Password update endpoint not yet implemented in backend OpenAPI for user ${id}`
    )
  )
}

export async function disableUser(
  id: string,
  _input: UserStatusToggleInput,
  etag?: string
): Promise<UserResponse> {
  const response = await updateUserSdk({
    path: { id: Number(id) },
    body: { status: 'inactive' },
    headers: { 'If-Match': etag ?? '""' },
  })
  if (!response.data) {
    throw new Error(`Failed to disable user ${id}`)
  }
  return response.data as UserResponse
}

export async function enableUser(
  id: string,
  _input: UserStatusToggleInput,
  etag?: string
): Promise<UserResponse> {
  const response = await updateUserSdk({
    path: { id: Number(id) },
    body: { status: 'active' },
    headers: { 'If-Match': etag ?? '""' },
  })
  if (!response.data) {
    throw new Error(`Failed to enable user ${id}`)
  }
  return response.data as UserResponse
}

export async function deleteUser(
  id: string,
  _input: unknown,
  etag?: string
): Promise<UserResponse> {
  // Soft delete: fetch current user, then update with active = false
  const { getUserById } = await import('../../../api/generated')
  const currentUserResponse = await getUserById({ path: { id: Number(id) } })
  if (!currentUserResponse.data) {
    throw new Error(`User ${id} not found`)
  }
  // generated SDK response type is wide; narrow to expected shape for access
  const currentUser = currentUserResponse.data as unknown as {
    firstName?: string
    lastName?: string
    email?: string
    locale?: string
    roles?: string[]
  }
  const response = await updateUserSdk({
    path: { id: Number(id) },
    body: {
      firstName: currentUser.firstName ?? '',
      lastName: currentUser.lastName ?? '',
      email: currentUser.email ?? '',
      locale: currentUser.locale ?? 'en',
      roles: currentUser.roles ? Array.from(currentUser.roles) : [],
      status: 'inactive',
    },
    headers: { 'If-Match': etag ?? '""' },
  })
  if (!response.data) {
    throw new Error(`Failed to delete user ${id}`)
  }
  return response.data as UserResponse
}
