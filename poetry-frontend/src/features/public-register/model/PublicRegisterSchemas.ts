/*
 * File: PublicRegisterSchemas.ts
 * Purpose: Zod schemas for public registration forms.
 * All Rights Reserved. Arodi Emmanuel
 */

import { z } from 'zod'

export const RegisterFormSchema: z.ZodSchema = z.object({
  username: z.string().min(1, 'register.username.required'),
  email: z.string().email('register.email.invalid'),
  password: z.string().min(6, 'register.password.min'),
})

export type RegisterForm = z.infer<typeof RegisterFormSchema>
