/*
 * File: PublicRegisterSchemas.ts
 * Purpose: Zod schemas and types for the public registration flow.
 * All Rights Reserved. Arodi Emmanuel
 */

import { z } from 'zod'

export const PublicRegisterRequestSchema: z.ZodType<{
  readonly username: string
  readonly email: string
  readonly password: string
}> = z.object({
  username: z.string().min(1, 'register.username.required'),
  email: z.string().email('register.email.invalid'),
  password: z.string().min(6, 'register.password.min'),
})

export const PublicRegisterResultSchema: z.ZodType<{
  readonly accessToken: string
  readonly refreshToken: string
}> = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export type PublicRegisterRequest = z.infer<typeof PublicRegisterRequestSchema>
export type PublicRegisterResult = z.infer<typeof PublicRegisterResultSchema>
