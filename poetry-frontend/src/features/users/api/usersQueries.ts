/*
 * File: usersQueries.ts
 * Purpose: Query operations for admin users feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UsersCollection, UserDetail } from '../model/UsersSchemas'
import {
  getUsersSdk,
  parseUserDetail,
  parseUsersCollection,
} from './usersApiShared'

export async function fetchUsersList(): Promise<UsersCollection> {
  const sdk: ReturnType<typeof getUsersSdk> = getUsersSdk()
  const dto: unknown = await sdk.list()
  return parseUsersCollection(dto)
}

export async function fetchUserById(id: string): Promise<UserDetail> {
  const sdk: ReturnType<typeof getUsersSdk> = getUsersSdk()
  const dto: unknown = await sdk.retrieve(id)
  return parseUserDetail(dto)
}
