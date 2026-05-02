/*
 * File: ProfileSchemas.ts
 * Purpose: Defines profile response schemas.
 * It parses profile data returned by the generated SDK.
 * It keeps unsupported profile updates isolated.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import type {
  ProfileResponse,
  ProfileUpdateRequest,
} from '../../../api/generated'

export type { ProfileResponse, ProfileUpdateRequest }
export type ProfileSummary = ProfileResponse

export const ProfileUsernameSchema = z.object({
  username: z
    .string()
    .min(3, 'profile.username.min_length'),
})

export type ProfileUsernameInput = z.infer<
  typeof ProfileUsernameSchema
>

export const ProfileSummarySchema:
  z.ZodType<ProfileResponse> = z.object({
    username: z
      .string()
      .min(1, 'profile.summary.username.required'),
    email: z
      .string()
      .email('profile.summary.email.invalid'),
    locale: z
      .string()
      .min(2, 'profile.summary.locale.required'),
    version: z.number(),
  }) as z.ZodType<ProfileResponse>

export type ProfileSummaryUpdateInput = ProfileUpdateRequest

export const ProfileSummaryUpdateSchema:
  z.ZodType<ProfileUpdateRequest> = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    locale: z.string().min(2).max(10),
    version: z.number().optional(),
  }) as z.ZodType<ProfileUpdateRequest>
