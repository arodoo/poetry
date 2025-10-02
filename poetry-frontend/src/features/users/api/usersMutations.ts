/*
 * File: usersMutations.ts
 * Purpose: Mutation operations for admin users feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  CreateUserSchema,
  UpdateUserRolesSchema,
  UpdateUserSchema,
  UpdateUserSecuritySchema,
  UserStatusToggleSchema,
  type CreateUserInput,
  type UpdateUserInput,
  type UpdateUserRolesInput,
  type UpdateUserSecurityInput,
  type UserStatusToggleInput,
  type UserDetail,
} from '../model/UsersSchemas'
import { getUsersSdk, parseUserDetail } from './usersApiShared'

export async function createUser(input: CreateUserInput): Promise<UserDetail> {
  const sdk: ReturnType<typeof getUsersSdk> = getUsersSdk()
  const payload: CreateUserInput = CreateUserSchema.parse(input)
  const dto: unknown = await sdk.create(payload)
  return parseUserDetail(dto)
}

export async function updateUser(
  id: string,
  input: UpdateUserInput
): Promise<UserDetail> {
  const sdk: ReturnType<typeof getUsersSdk> = getUsersSdk()
  const payload: UpdateUserInput = UpdateUserSchema.parse(input)
  const dto: unknown = await sdk.update(id, payload)
  return parseUserDetail(dto)
}

export async function updateUserRoles(
  id: string,
  input: UpdateUserRolesInput
): Promise<UserDetail> {
  const sdk: ReturnType<typeof getUsersSdk> = getUsersSdk()
  const payload: UpdateUserRolesInput = UpdateUserRolesSchema.parse(input)
  const dto: unknown = await sdk.updateRoles(id, payload)
  return parseUserDetail(dto)
}

export async function updateUserSecurity(
  id: string,
  input: UpdateUserSecurityInput
): Promise<UserDetail> {
  const sdk: ReturnType<typeof getUsersSdk> = getUsersSdk()
  const payload: UpdateUserSecurityInput = UpdateUserSecuritySchema.parse(input)
  const dto: unknown = await sdk.updateSecurity(id, payload)
  return parseUserDetail(dto)
}

export async function disableUser(
  id: string,
  input: UserStatusToggleInput
): Promise<UserDetail> {
  const sdk: ReturnType<typeof getUsersSdk> = getUsersSdk()
  const payload: UserStatusToggleInput = UserStatusToggleSchema.parse(input)
  const dto: unknown = await sdk.disable(id, payload)
  return parseUserDetail(dto)
}

export async function enableUser(
  id: string,
  input: UserStatusToggleInput
): Promise<UserDetail> {
  const sdk: ReturnType<typeof getUsersSdk> = getUsersSdk()
  const payload: UserStatusToggleInput = UserStatusToggleSchema.parse(input)
  const dto: unknown = await sdk.enable(id, payload)
  return parseUserDetail(dto)
}
