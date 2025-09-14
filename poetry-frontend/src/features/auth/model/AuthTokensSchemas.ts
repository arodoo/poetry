/*
 * File: AuthTokensSchemas.ts
 * Purpose: Zod schemas and types for auth tokens and me endpoint.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const AuthTokensSchema: z.ZodType<Readonly<AuthTokens>> = z
  .object({
    accessToken: z.string().min(1),
    refreshToken: z.string().min(1),
    tokenType: z.literal('Bearer'),
    expiresIn: z.number().positive(),
  })
  .readonly()
export interface AuthTokens {
  accessToken: string
  refreshToken: string
  tokenType: 'Bearer'
  expiresIn: number
}

export const MeSchema: z.ZodType<Readonly<Me>> = z
  .object({ id: z.string(), username: z.string(), roles: z.array(z.string()) })
  .readonly()
export interface Me {
  id: string
  username: string
  roles: string[]
}
