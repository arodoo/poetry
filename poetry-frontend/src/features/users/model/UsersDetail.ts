/*
 * File: UsersDetail.ts
 * Purpose: Detailed user schema including concurrency version field.
 * All Rights Reserved. Arodi Emmanuel
 */
import { UserSummarySchema, type UserSummary } from './UsersSummary.schema'

export const UserDetailSchema: typeof UserSummarySchema = UserSummarySchema

export type UserDetail = UserSummary
