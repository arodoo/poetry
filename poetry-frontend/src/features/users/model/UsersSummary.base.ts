/*
 * File: UsersSummary.base.ts
 * Purpose: Base schema for user summary (split to respect 80 line limit).
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import {
  UserIdentifierSchema,
  UserRoleSchema,
  UserStatusSchema,
} from './UsersBasics'

export const fallbackTimestamp: string = new Date(0).toISOString()

export const userSummaryBaseSchema: z.ZodObject<{
  id: typeof UserIdentifierSchema
  username: z.ZodString
  email: z.ZodString
  locale: z.ZodOptional<z.ZodString>
  roles: z.ZodArray<typeof UserRoleSchema>
  status: z.ZodOptional<typeof UserStatusSchema>
  active: z.ZodOptional<z.ZodBoolean>
  createdAt: z.ZodOptional<z.ZodString>
  updatedAt: z.ZodOptional<z.ZodString>
  version: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>
}> = z.object({
  id: UserIdentifierSchema,
  username: z.string().min(1, 'users.validation.username'),
  email: z.string().email('users.validation.email'),
  locale: z.string().min(2, 'users.validation.locale').optional(),
  roles: z.array(UserRoleSchema).min(1, 'users.validation.roles'),
  status: UserStatusSchema.optional(),
  active: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  version: z.union([z.string(), z.number()]).optional(),
})

export interface NormalizedUserSummary {
  id: string
  username: string
  email: string
  locale: string
  roles: string[]
  status: 'active' | 'disabled'
  createdAt: string
  updatedAt: string
  version: string
}
