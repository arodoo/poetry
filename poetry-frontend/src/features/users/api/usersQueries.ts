/*
 * File: usersQueries.ts
 * Purpose: Query operations using generated SDK for admin users feature.
 * Returns generated UserResponse types directly (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  listUsers as listUsersSdk,
  listUsersPaged as listUsersPagedSdk,
  getUserById as getUserByIdSdk,
  type UserResponse,
  type PageResponseDtoUserResponse,
} from '../../../api/generated'

export async function fetchUsersList(): Promise<UserResponse[]> {
  const response = await listUsersSdk()
  if (!response.data) return []
  return (response.data as unknown) as UserResponse[]
}

export async function fetchUsersPage(
  page: number,
  size: number,
  search?: string
): Promise<PageResponseDtoUserResponse> {
  const response = await listUsersPagedSdk({
    query: {
      page,
      size,
      ...(search ? { search } : {}),
    },
  })
  if (!response.data) {
    throw new Error('Failed to fetch users page')
  }
  return response.data as PageResponseDtoUserResponse
}

export async function fetchUserById(id: string): Promise<UserResponse> {
  const response = await getUserByIdSdk({ path: { id: Number(id) } })
  if (!response.data) {
    throw new Error(`User ${id} not found`)
  }
  return response.data as UserResponse
}
