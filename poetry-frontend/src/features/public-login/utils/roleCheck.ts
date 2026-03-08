/*
 * File: roleCheck.ts
 * Purpose: Utility to determine if a user has only the basic user
 * role. Users with only the 'user' role are blocked from accessing
 * the admin panel and should not be able to log in.
 * All Rights Reserved. Arodi Emmanuel
 */

const BLOCKED_ROLE = 'user'

export function hasOnlyUserRole(roles: readonly string[]): boolean {
  if (roles.length === 0) return true
  return roles.every((r: string) => r.toLowerCase() === BLOCKED_ROLE)
}
