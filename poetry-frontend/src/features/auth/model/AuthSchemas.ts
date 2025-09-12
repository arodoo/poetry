/*
 * File: AuthSchemas.ts
 * Purpose: Minimal placeholder Zod schema and types for the auth
 * feature. Real schemas will be introduced alongside endpoint work.
 * All Rights Reserved. Arodi Emmanuel TODO
 */
import { z } from 'zod'

export const AuthStatusSchema: z.ZodType<{ authenticated: boolean }> = z.object(
  {
    authenticated: z.boolean(),
  }
)
export type AuthStatus = z.infer<typeof AuthStatusSchema>
