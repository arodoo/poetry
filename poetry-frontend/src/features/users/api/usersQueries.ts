/*
 * File: usersQueries.ts
 * Purpose: Query operations using generated SDK for admin users feature.
 * Returns generated UserResponse types directly (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  listUsers as listUsersSdk,
  getUserById as getUserByIdSdk,
  type UserResponse,
} from '../../../api/generated'

export async function fetchUsersList(): Promise<UserResponse[]> {
  const response = await listUsersSdk()
  return (response.data as UserResponse[]) ?? []
}

export async function fetchUserById(id: string): Promise<UserResponse> {
  const response = await getUserByIdSdk({ path: { id: Number(id) } })
  if (!response.data) {
    throw new Error(`User ${id} not found`)
  }
  return response.data as UserResponse
}
