/*
 * File: publicLoginApi.ts
 * Purpose: API wrapper for public login using shared HTTP client.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { LoginForm } from '../model/PublicLoginSchemas'
import { fetchJson } from '../../../shared/http/fetchClient'
import type { HttpOptions } from '../../../shared/http/httpTypes'
import {
  AuthTokensSchema,
  type AuthTokens,
} from '../../auth/model/AuthTokensSchemas'
import { createIdempotencyKey } from '../../../shared/http/idempotency'

// API wrapper using shared HTTP client. Returns parsed JSON on success.
export async function loginRequest(
  payload: LoginForm,
  signal?: AbortSignal
): Promise<AuthTokens> {
  const base: HttpOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': createIdempotencyKey(),
    },
    body: payload, // Let fetchJson handle JSON.stringify
    retry: { maxAttempts: 1, backoffMs: 0 }, // No retries for auth
  }
  const options: HttpOptions = signal ? { ...base, signal } : base
  const res: unknown = await fetchJson<unknown>('/api/v1/auth/login', options)
  return AuthTokensSchema.parse(res) as AuthTokens
}
