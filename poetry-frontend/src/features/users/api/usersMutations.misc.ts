/*
 * File: usersMutations.misc.ts
 * Purpose: Remaining user mutation operations split out to reduce file length.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  updateUser as updateUserSdk,
  type UserResponse,
} from '../../../api/generated'
import { type UserStatusToggleInput } from '../model/UsersSchemas'

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
  const { getUserById } = await import('../../../api/generated')
  const currentUserResponse = await getUserById({ path: { id: Number(id) } })
  if (!currentUserResponse.data) {
    throw new Error(`User ${id} not found`)
  }
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
