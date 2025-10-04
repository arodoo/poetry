/*
 * File: usersQueries.ts
 * Purpose: Query operations using generated SDK for admin users feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  listUsers as listUsersSdk,
  getUserById as getUserByIdSdk,
  type UserResponse,
} from '../../../api/generated'
import type { UsersCollection, UserDetail } from '../model/UsersSchemas'
import { parseUserDetail, parseUsersCollection } from './usersApiShared'

export async function fetchUsersList(): Promise<UsersCollection> {
  const response = await listUsersSdk()
  const data = response.data as UserResponse[]
  return parseUsersCollection(data)
}

export async function fetchUserById(id: string): Promise<UserDetail> {
  const response = await getUserByIdSdk({ path: { id: Number(id) } })
  const data = response.data as UserResponse
  return parseUserDetail(data)
}
