/*
 File: env.ts
 Purpose: Centralized frontend environment schema using Zod. Validates
 Vite's import.meta.env at startup and exports a typed, read-only
 configuration object to be injected in services and hooks.
 All Rights Reserved. Arodi Emmanuel
*/
import { z } from 'zod'

export type Env = Readonly<{
  VITE_API_BASE_URL: string
  VITE_LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error'
  VITE_FEATURE_AUTH: boolean
  // http client configuration
  VITE_HTTP_TIMEOUT_MS: number
  VITE_HTTP_RETRY_MAX_ATTEMPTS: number
  VITE_HTTP_RETRY_BACKOFF_MS: number
}>

const schema: z.ZodTypeAny = z
  .object({
    VITE_API_BASE_URL: z.string().url(),
    VITE_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
    VITE_FEATURE_AUTH: z
      .string()
      .transform((v: string): boolean => v === 'true')
      .default('true'),
    VITE_HTTP_TIMEOUT_MS: z
      .string()
      .default('5000')
      .transform((v: string): number => Number.parseInt(v, 10))
      .pipe(z.number().int().min(1)),
    VITE_HTTP_RETRY_MAX_ATTEMPTS: z
      .string()
      .default('3')
      .transform((v: string): number => Number.parseInt(v, 10))
      .pipe(z.number().int().min(1)),
    VITE_HTTP_RETRY_BACKOFF_MS: z
      .string()
      .default('200')
      .transform((v: string): number => Number.parseInt(v, 10))
      .pipe(z.number().int().min(0)),
  })
  .readonly()

export const parseEnv: (e: Record<string, unknown>) => Env = (
  e: Record<string, unknown>
): Env => {
  return schema.parse(e) as Env
}

let cachedEnv: Env | null = null
export const getEnv: () => Env = (): Env => {
  cachedEnv ??= parseEnv(import.meta.env)
  return cachedEnv
}
