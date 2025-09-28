/*
 * File: validatePasswords.ts
 * Purpose: Validate password fields with the profile schema while keeping
 * validation isolated to reduce hook complexity and maintain line limits.
 * All Rights Reserved. Arodi Emmanuel
 */
import { ProfilePasswordChangeSchema } from '../model/ProfileSchemas'

export function validatePasswords(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): ReturnType<typeof ProfilePasswordChangeSchema.safeParse> {
  return ProfilePasswordChangeSchema.safeParse({
    currentPassword,
    newPassword,
    confirmPassword,
  })
}

export default validatePasswords
