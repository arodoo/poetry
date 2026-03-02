/*
 * File: UserProfile.ts
 * Purpose: Zod schema and TypeScript type for user profile.
 * Represents the authenticated user identity returned by
 * Google Sign-In. Used by AuthProvider and profile screens.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const UserProfileSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  displayName: z.string().min(1),
  avatarUrl: z.string().url().optional(),
})

export type UserProfile = z.infer<typeof UserProfileSchema>
