/*
 * File: UsersSchemas.ts
 * Purpose: Aggregated re-exports for users feature schemas.
 * Uses generated SDK types directly (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */

// Re-export SDK types directly - NO custom types
export type {
  UserResponse,
  UserCreateRequest,
  UserUpdateRequest,
} from '../../../api/generated'

// Type aliases for clarity (all point to UserResponse)
export type { UserResponse as User } from '../../../api/generated'
export type { UserResponse as UserDetail } from '../../../api/generated'
export type { UserResponse as UserSummary } from '../../../api/generated'

// Collection using SDK type directly
export type UsersCollection =
  readonly import('../../../api/generated').UserResponse[]

// Zod input validation schemas (validate before sending to SDK)
// These add client-side validation on TOP of OpenAPI contracts
export {
  CreateUserSchema,
  UpdateUserSchema,
  UpdateUserRolesSchema,
  UpdateUserSecuritySchema,
  UserStatusToggleSchema,
  type CreateUserInput,
  type UpdateUserInput,
  type UpdateUserRolesInput,
  type UpdateUserSecurityInput,
  type UserStatusToggleInput,
} from './UsersCommands'
