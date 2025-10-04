/*
 * File: usersMutations.ts
 * Purpose: Mutation operations using generated SDK for admin users feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  createUser as createUserSdk,
  updateUser as updateUserSdk,
  type UserCreateRequest,
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
  type UserDetail,
} from '../model/UsersSchemas'
import { parseUserDetail } from './usersApiShared'

export async function createUser(input: CreateUserInput): Promise<UserDetail> {
  const payload: CreateUserInput = CreateUserSchema.parse(input)
  const requestBody: UserCreateRequest = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    username: payload.username,
    email: payload.email,
    password: payload.password,
    ...(payload.locale && { locale: payload.locale }),
    ...(payload.roles && { roles: payload.roles }),
  }
  const response = await createUserSdk({ body: requestBody })
  const data = response.data as UserResponse
  return parseUserDetail(data)
}

export async function updateUser(
  id: string,
  input: UpdateUserInput,
  etag?: string
): Promise<UserDetail> {
  const payload: UpdateUserInput = UpdateUserSchema.parse(input)
  const response = await updateUserSdk({
    path: { id: Number(id) },
    body: payload,
    headers: { 'If-Match': etag || '""' },
  })
  const data = response.data as UserResponse
  return parseUserDetail(data)
}

export async function updateUserRoles(
  id: string,
  input: UpdateUserRolesInput,
  etag?: string
): Promise<UserDetail> {
  const payload: UpdateUserRolesInput = UpdateUserRolesSchema.parse(input)
  const response = await updateUserSdk({
    path: { id: Number(id) },
    body: { roles: payload.roles },
    headers: { 'If-Match': etag || '""' },
  })
  const data = response.data as UserResponse
  return parseUserDetail(data)
}

export async function updateUserSecurity(
  id: string,
  input: UpdateUserSecurityInput,
  _etag?: string
): Promise<UserDetail> {
  UpdateUserSecuritySchema.parse(input)
  throw new Error(
    `Password update endpoint not yet implemented in backend OpenAPI for user ${id}`
  )
}

export async function disableUser(
  id: string,
  _input: UserStatusToggleInput,
  etag?: string
): Promise<UserDetail> {
  const response = await updateUserSdk({
    path: { id: Number(id) },
    body: { active: false },
    headers: { 'If-Match': etag || '""' },
  })
  const data = response.data as UserResponse
  return parseUserDetail(data)
}

export async function enableUser(
  id: string,
  _input: UserStatusToggleInput,
  etag?: string
): Promise<UserDetail> {
  const response = await updateUserSdk({
    path: { id: Number(id) },
    body: { active: true },
    headers: { 'If-Match': etag || '""' },
  })
  const data = response.data as UserResponse
  return parseUserDetail(data)
}
