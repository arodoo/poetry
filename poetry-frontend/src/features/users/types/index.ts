/*
 * File: index.ts
 * Purpose: Re-export generated SDK types as the single source of truth.
 * All user-related types derive from OpenAPI-generated types (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
export type {
  UserResponse,
  UserCreateRequest,
  UserUpdateRequest,
} from '../../../api/generated'
