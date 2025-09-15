/*
 * File: publicRegisterApi.ts
 * Purpose: API wrapper for public register requests. Responsible for
 *          ensuring idempotency headers and using the shared HTTP client to
 *          perform network requests. Returns parsed JSON responses.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { RegisterForm } from '../model/PublicRegisterSchemas'
import { fetchJson } from '../../../shared/http/fetchClient'
import type { HttpOptions } from '../../../shared/http/httpTypes'

export async function registerRequest(
  payload: RegisterForm,
  idempotencyKey?: string,
  signal?: AbortSignal
): Promise<unknown> {
  const key: string =
    idempotencyKey ?? 'idem-' + Math.random().toString(36).slice(2, 10)
  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Idempotency-Key': key,
  }

  const base: HttpOptions = {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify(payload),
  }

  const options: HttpOptions = signal ? { ...base, signal } : base
  const res: unknown = await fetchJson<unknown>(
    '/api/v1/auth/register',
    options
  )
  return res
}
