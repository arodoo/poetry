/*
 * File: users.ts
 * Purpose: Re-exports for users client to keep sdk index compact.
 *
 * This module groups the users-specific SDK exports separately so the main
 * `index.ts` stays short and within line limits. It improves maintainability
 * by keeping related re-exports together.
 * All Rights Reserved. Arodi Emmanuel
 */
export {
  createUsersSdk,
  type UsersSdk,
  type UserDto,
  type UserCollectionDto,
} from './usersClient'
