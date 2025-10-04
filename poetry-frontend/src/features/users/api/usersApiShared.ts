/*
 * File: usersApiShared.ts
 * Purpose: Parsers for users API responses using generated SDK types.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import {
  UsersCollectionSchema,
  UserDetailSchema,
  type UsersCollection,
  type UserDetail,
} from '../model/UsersSchemas'

export function parseUsersCollection(dto: unknown): UsersCollection {
  const parsed: z.infer<typeof UsersCollectionSchema> =
    UsersCollectionSchema.parse(dto)
  return parsed as UsersCollection
}

export function parseUserDetail(dto: unknown): UserDetail {
  const parsed: unknown = UserDetailSchema.parse(dto)
  return parsed as UserDetail
}
