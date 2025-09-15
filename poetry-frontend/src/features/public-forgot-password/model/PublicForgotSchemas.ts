/*
 * File: PublicForgotSchemas.ts
 * Purpose: Zod schemas for public forgot-password forms.
 * All Rights Reserved. Arodi Emmanuel
 */

import { z } from 'zod'

export const ForgotFormSchema: z.ZodSchema = z.object({
  email: z.string().email('forgot.email.invalid'),
})

export type ForgotForm = z.infer<typeof ForgotFormSchema>
