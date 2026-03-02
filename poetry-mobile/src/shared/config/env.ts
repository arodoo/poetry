/*
 * File: env.ts
 * Purpose: Environment configuration schema with Zod validation.
 * Ensures all required environment variables are present and
 * valid at app startup. Provides type-safe config access.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import Constants from 'expo-constants'

const envSchema = z.object({
  apiBaseUrl: z.string().url(),
  googleClientId: z.string().min(1).optional(),
})

export type Env = z.infer<typeof envSchema>

export function getEnv(): Env {
  const extra = Constants.expoConfig?.extra ?? {}
  return envSchema.parse({
    apiBaseUrl:
      extra.apiBaseUrl ??
      'http://localhost:8080/api/v1',
    googleClientId: extra.googleClientId,
  })
}
