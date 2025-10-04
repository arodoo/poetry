/*
 * File: AuthTokensSchemas.ts
 * Purpose: Zod schemas and types for auth tokens and me endpoint.
 * Field names and optionality aligned with SDK TokenResponse to maintain SSOT.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const AuthTokensSchema = z
  .object({
    accessToken: z.string().min(1),
    refreshToken: z.string().min(1),
    username: z.string().min(1).optional(),
    expiresIn: z.number().positive().optional(),
  })
  .strict()

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  username?: string | undefined
  expiresIn?: number | undefined
}

export const MeSchema: z.ZodType<Readonly<Me>> = z
  .object({ id: z.string(), username: z.string(), roles: z.array(z.string()) })
  .readonly()
export interface Me {
  id: string
  username: string
  roles: string[]
}
