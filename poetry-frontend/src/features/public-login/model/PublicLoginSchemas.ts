/*
 * File: PublicLoginSchemas.ts
 * Purpose: Zod schemas for public login forms.
 * All Rights Reserved. Arodi Emmanuel
 */

import { z } from 'zod'

export const LoginFormSchema: z.ZodSchema = z.object({
  username: z.string().min(1, 'login.username.required'),
  password: z.string().min(1, 'login.password.required'),
})

export type LoginForm = z.infer<typeof LoginFormSchema>
