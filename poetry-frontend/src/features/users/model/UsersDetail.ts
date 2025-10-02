/*
 * File: UsersDetail.ts
 * Purpose: Detailed user schema including concurrency version field.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type z } from 'zod'
import { UserSummarySchema } from './UsersSummary.schema'

export const UserDetailSchema: typeof UserSummarySchema = UserSummarySchema

export type UserDetail = z.infer<typeof UserDetailSchema>
