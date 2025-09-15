/*
 * File: publicLoginApi.ts
 * Purpose: API wrapper for public login using shared HTTP client.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { LoginForm } from '../model/PublicLoginSchemas'
import { fetchJson } from '../../../shared/http/fetchClient'
import type { HttpOptions } from '../../../shared/http/httpTypes'

// API wrapper using shared HTTP client. Returns parsed JSON on success.
export async function loginRequest(
  payload: LoginForm,
  signal?: AbortSignal
): Promise<unknown> {
  const base: HttpOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }
  const options: HttpOptions = signal ? { ...base, signal } : base
  const res: unknown = await fetchJson<unknown>('/api/v1/auth/login', options)
  return res
}
