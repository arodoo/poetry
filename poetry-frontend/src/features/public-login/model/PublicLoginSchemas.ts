/*
 * File: PublicLoginSchemas.ts
 * Purpose: Zod schemas for public login forms.
 * All Rights Reserved. Arodi Emmanuel
 */

import { z } from 'zod'

export const PublicLoginRequestSchema: z.ZodObject<{
  username: z.ZodString
  password: z.ZodString
}> = z.object({
  username: z.string().min(1, 'ui.publicLogin.errors.username'),
  password: z.string().min(1, 'ui.publicLogin.errors.password'),
})

export type PublicLoginRequest = z.infer<typeof PublicLoginRequestSchema>

export const LoginFormSchema: z.ZodObject<{
  username: z.ZodString
  password: z.ZodString
}> = PublicLoginRequestSchema
export type LoginForm = PublicLoginRequest

export const PublicLoginResultSchema: z.ZodObject<{
  accessToken: z.ZodString
  refreshToken: z.ZodString
}> = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
})

export type PublicLoginResult = z.infer<typeof PublicLoginResultSchema>
