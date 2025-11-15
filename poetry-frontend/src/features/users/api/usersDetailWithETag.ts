/*
 * File: usersDetailWithETag.ts
 * Purpose: Fetch user detail and capture ETag header for optimistic locking.
 * Uses generated SDK getUserById and UserResponse type (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */

import {
  getUserById as getUserByIdSdk,
  type UserResponse,
} from '../../../api/generated'

export interface UserDetailWithETag {
  readonly user: UserResponse
  readonly etag: string | null
}

export async function fetchUserDetailWithETag(
  id: string
): Promise<UserDetailWithETag> {
  const response = await getUserByIdSdk({ path: { id: Number(id) } })
  if (!response.data) {
    throw new Error(`User ${id} not found`)
  }
  const user: UserResponse = response.data
  const etag: string | null = response.response.headers.get('ETag')
  return { user, etag }
}
