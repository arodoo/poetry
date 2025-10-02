/*
 * File: usersApiShared.ts
 * Purpose: Shared helpers for users API wrappers.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import {
  createUsersSdk,
  type UserCollectionDto,
  type UserDto,
  type UsersSdk,
} from '../../../shared/sdk'
import {
  UsersCollectionSchema,
  UserDetailSchema,
  type UsersCollection,
  type UserDetail,
} from '../model/UsersSchemas'

const sdk: UsersSdk = createUsersSdk()

export function getUsersSdk(): UsersSdk {
  return sdk
}

export function parseUsersCollection(dto: unknown): UsersCollection {
  const collection: unknown = dto as UserCollectionDto
  const parsed: z.infer<typeof UsersCollectionSchema> =
    UsersCollectionSchema.parse(collection)
  return parsed as UsersCollection
}

export function parseUserDetail(dto: unknown): UserDetail {
  const detail: unknown = dto as UserDto
  const parsed: unknown = UserDetailSchema.parse(detail)
  return parsed as UserDetail
}
