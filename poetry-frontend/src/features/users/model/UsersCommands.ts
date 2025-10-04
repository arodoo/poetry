/*
 * File: UsersCommands.ts
 * Purpose: Command payload schemas for admin user mutations.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import { UserRoleSchema } from './UsersBasics'

export const CreateUserSchema: z.ZodObject<{
  firstName: z.ZodString
  lastName: z.ZodString
  username: z.ZodString
  email: z.ZodString
  locale: z.ZodOptional<z.ZodString>
  roles: z.ZodOptional<z.ZodArray<z.ZodString>>
  password: z.ZodString
}> = z.object({
  firstName: z.string().min(1, 'users.validation.firstName'),
  lastName: z.string().min(1, 'users.validation.lastName'),
  username: z.string().min(3, 'users.validation.username'),
  email: z.string().email('users.validation.email'),
  locale: z.string().min(2, 'users.validation.locale').optional(),
  roles: z.array(UserRoleSchema).min(1, 'users.validation.roles').optional(),
  password: z.string().min(10, 'users.validation.password'),
})

export type CreateUserInput = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema: z.ZodObject<{
  firstName: z.ZodString
  lastName: z.ZodString
  email: z.ZodString
  username: z.ZodString
  locale: z.ZodString
  roles: z.ZodArray<z.ZodString>
  active: z.ZodBoolean
  version: z.ZodString
}> = z.object({
  firstName: z.string().min(1, 'users.validation.firstName'),
  lastName: z.string().min(1, 'users.validation.lastName'),
  email: z.string().email('users.validation.email'),
  username: z.string().min(3, 'users.validation.username'),
  locale: z.string().min(2, 'users.validation.locale'),
  roles: z.array(UserRoleSchema).min(1, 'users.validation.roles'),
  active: z.boolean(),
  version: z.string().min(1, 'users.validation.version'),
})

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>

export const UpdateUserRolesSchema: z.ZodObject<{
  roles: z.ZodArray<z.ZodString>
  version: z.ZodString
}> = z.object({
  roles: z.array(UserRoleSchema).min(1, 'users.validation.roles'),
  version: z.string().min(1, 'users.validation.version'),
})

export type UpdateUserRolesInput = z.infer<typeof UpdateUserRolesSchema>

export const UpdateUserSecuritySchema: z.ZodObject<{
  password: z.ZodString
  version: z.ZodString
}> = z.object({
  password: z.string().min(10, 'users.validation.password'),
  version: z.string().min(1, 'users.validation.version'),
})

export type UpdateUserSecurityInput = z.infer<typeof UpdateUserSecuritySchema>

export const UserStatusToggleSchema: z.ZodObject<{
  version: z.ZodString
}> = z.object({
  version: z.string().min(1, 'users.validation.version'),
})

export type UserStatusToggleInput = z.infer<typeof UserStatusToggleSchema>
