/*
 * File: AuthSchemas.ts
 * Purpose: Zod schemas and types for the auth feature. Keeps a small
 * stable surface until endpoints evolve. All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const AuthStatusSchema: z.ZodType<{ authenticated: boolean }> = z
  .object({
    authenticated: z.boolean(),
  })
  .readonly()
export type AuthStatus = z.infer<typeof AuthStatusSchema>
