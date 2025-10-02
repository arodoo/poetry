/*
 * File: UsersBasics.ts
 * Purpose: Foundational schemas and types shared across users feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const UserIdentifierSchema: z.ZodEffects<
  z.ZodUnion<[z.ZodString, z.ZodNumber]>,
  string,
  string | number
> = z
  .union([z.string(), z.number()])
  .transform((value: string | number): string => {
    const asString: string = String(value).trim()
    if (asString.length === 0) {
      throw new Error('users.validation.identifier')
    }
    return asString
  })

export type UserIdentifier = z.infer<typeof UserIdentifierSchema>

export const UserRoleSchema: z.ZodString = z
  .string()
  .min(1, 'users.validation.role')

export type UserRole = z.infer<typeof UserRoleSchema>

export const UserStatusSchema: z.ZodEnum<['active', 'disabled']> = z.enum([
  'active',
  'disabled',
])

export type UserStatus = z.infer<typeof UserStatusSchema>
