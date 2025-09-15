/*
 * File: publicForgotApi.ts
 * Purpose: API wrapper for forgot-password requests. Sends payload to auth
 *          forgot-password endpoint via shared HTTP client and returns parsed
 *          JSON response for consumers.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ForgotForm } from '../model/PublicForgotSchemas'
import { fetchJson } from '../../../shared/http/fetchClient'
import type { HttpOptions } from '../../../shared/http/httpTypes'

export async function forgotRequest(
  payload: ForgotForm,
  signal?: AbortSignal
): Promise<unknown> {
  const base: HttpOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }
  const options: HttpOptions = signal ? { ...base, signal } : base
  return fetchJson('/api/v1/auth/forgot-password', options)
}
