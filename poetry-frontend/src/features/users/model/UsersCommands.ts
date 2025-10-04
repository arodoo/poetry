/*
 * File: UsersCommands.ts
 * Purpose: Zod runtime validation for SDK request types.
 * Types are SDK types directly. Schemas add client-side validation only.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import type {
  UserCreateRequest,
  UserUpdateRequest,
} from '../../../api/generated'

/**
 * Runtime validation for UserCreateRequest.
 * TYPE = UserCreateRequest (SDK). SCHEMA = adds min lengths validation.
 *
 * @see {UserCreateRequest} from api/generated - OpenAPI source of truth
 */
export type CreateUserInput = UserCreateRequest

export const CreateUserSchema: z.ZodType<CreateUserInput> = z.object({
  firstName: z.string().min(1, 'users.validation.firstName'),
  lastName: z.string().min(1, 'users.validation.lastName'),
  username: z.string().min(3, 'users.validation.username'),
  email: z.string().email('users.validation.email'),
  password: z.string().min(10, 'users.validation.password'),
  locale: z.string().min(2, 'users.validation.locale').optional(),
  roles: z.array(z.string()).optional(),
}) as z.ZodType<CreateUserInput>

/**
 * Runtime validation for UserUpdateRequest.
 * TYPE = UserUpdateRequest (SDK). SCHEMA = adds validation.
 *
 * @see {UserUpdateRequest} from api/generated - OpenAPI source of truth
 */
export type UpdateUserInput = UserUpdateRequest

export const UpdateUserSchema: z.ZodType<UpdateUserInput> = z.object({
  firstName: z.string().min(1, 'users.validation.firstName').optional(),
  lastName: z.string().min(1, 'users.validation.lastName').optional(),
  email: z.string().email('users.validation.email').optional(),
  locale: z.string().min(2, 'users.validation.locale').optional(),
  roles: z.array(z.string()).optional(),
  active: z.boolean().optional(),
}) as z.ZodType<UpdateUserInput>

/**
 * Partial update - roles only (not in SDK, custom operation)
 */
export const UpdateUserRolesSchema = z.object({
  roles: z.array(z.string()).min(1, 'users.validation.roles'),
})

export type UpdateUserRolesInput = z.infer<typeof UpdateUserRolesSchema>

/**
 * Partial update - password only (not in SDK, custom operation)
 */
export const UpdateUserSecuritySchema = z.object({
  password: z.string().min(10, 'users.validation.password'),
})

export type UpdateUserSecurityInput = z.infer<typeof UpdateUserSecuritySchema>

/**
 * Toggle active status (not in SDK, custom operation)
 */
export const UserStatusToggleSchema = z.object({
  active: z.boolean(),
})

export type UserStatusToggleInput = z.infer<typeof UserStatusToggleSchema>
