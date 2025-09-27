/*
 * File: PublicForgotPasswordSchemas.ts
 * Purpose: Zod schemas for public forgot-password flow.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const PublicForgotPasswordRequestSchema: z.ZodObject<{
  email: z.ZodString
}> = z.object({
  email: z.string().email('ui.publicForgotPassword.errors.email'),
})

export const PublicForgotPasswordResultSchema: z.ZodObject<{
  messageKey: z.ZodString
}> = z.object({
  messageKey: z.string().min(1),
})

export type PublicForgotPasswordRequest = z.infer<
  typeof PublicForgotPasswordRequestSchema
>
export type PublicForgotPasswordResult = z.infer<
  typeof PublicForgotPasswordResultSchema
>
