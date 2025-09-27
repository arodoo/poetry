/*
 * File: ProfileSchemas.ts
 * Purpose: Zod schemas for profile username editing and password changes.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import { MIN_PASSWORD_LENGTH } from '../../../shared/security/passwordPolicy'

export const ProfileUsernameSchema: z.ZodObject<{ username: z.ZodString }> =
  z.object({
    username: z.string().min(3, 'profile.username.min_length'),
  })

export type ProfileUsernameInput = z.infer<typeof ProfileUsernameSchema>

export const ProfileSummarySchema: z.ZodObject<{
  username: z.ZodString
  email: z.ZodString
  locale: z.ZodString
  version: z.ZodString
}> = z.object({
  username: z.string().min(1, 'profile.summary.username.required'),
  email: z.string().email('profile.summary.email.invalid'),
  locale: z.string().min(2, 'profile.summary.locale.required'),
  version: z.string().min(1, 'profile.summary.version.required'),
})

export type ProfileSummary = z.infer<typeof ProfileSummarySchema>

export const ProfileSummaryUpdateSchema: z.ZodObject<{
  username: z.ZodString
  version: z.ZodString
}> = ProfileSummarySchema.pick({
  username: true,
  version: true,
})

export type ProfileSummaryUpdateInput = z.infer<
  typeof ProfileSummaryUpdateSchema
>

export const ProfilePasswordChangeSchema: z.ZodType<{
  currentPassword: string
  newPassword: string
  confirmPassword: string
}> = z
  .object({
    currentPassword: z.string().min(1, 'profile.password.current.required'),
    newPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, 'profile.password.new.policy'),
    confirmPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, 'profile.password.confirm.policy'),
  })
  .refine(
    (values: { newPassword: string; confirmPassword: string }): boolean =>
      values.newPassword === values.confirmPassword,
    {
      message: 'profile.password.confirm.mismatch',
      path: ['confirmPassword'],
    }
  )

export type ProfilePasswordChangeInput = z.infer<
  typeof ProfilePasswordChangeSchema
>
