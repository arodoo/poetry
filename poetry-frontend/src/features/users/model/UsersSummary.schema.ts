/*
 * File: UsersSummary.schema.ts
 * Purpose: Transformation schema producing normalized user summary.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import {
  userSummaryBaseSchema,
  fallbackTimestamp,
  type NormalizedUserSummary,
} from './UsersSummary.base'

export const UserSummarySchema: ReturnType<
  typeof userSummaryBaseSchema.transform
> = userSummaryBaseSchema.transform(
  (user: (typeof userSummaryBaseSchema)['_output']): NormalizedUserSummary => {
    const locale: string = user.locale ?? 'en'
    const status: 'active' | 'disabled' =
      user.status ??
      (typeof user.active === 'boolean'
        ? user.active
          ? 'active'
          : 'disabled'
        : 'active')
    const createdAt: string = user.createdAt ?? fallbackTimestamp
    const updatedAt: string = user.updatedAt ?? createdAt
    const version: string =
      typeof user.version === 'string'
        ? user.version
        : user.version != null
          ? String(user.version)
          : '1'
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      locale,
      roles: user.roles,
      status,
      createdAt,
      updatedAt,
      version,
    }
  }
)

export type UserSummary = NormalizedUserSummary
export const UsersCollectionSchema: z.ZodArray<typeof UserSummarySchema> =
  z.array(UserSummarySchema)
export type UsersCollection = readonly UserSummary[]
