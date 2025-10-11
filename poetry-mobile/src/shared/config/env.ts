/*
 * File: env.ts
 * Purpose: Environment configuration schema with Zod validation.
 * Ensures all required environment variables are present and valid
 * at app startup. Provides type-safe access to configuration.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import Constants from 'expo-constants'

const envSchema = z.object({
  apiBaseUrl: z.string().url(),
  mapboxAccessToken: z.string().min(1),
})

export type Env = z.infer<typeof envSchema>

export function getEnv(): Env {
  const raw = {
    apiBaseUrl:
      Constants.expoConfig?.extra?.apiBaseUrl ??
      'http://localhost:8080/api/v1',
    mapboxAccessToken:
      Constants.expoConfig?.extra?.mapboxAccessToken ?? '',
  }

  return envSchema.parse(raw)
}
