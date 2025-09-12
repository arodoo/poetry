/*
 * File: adminApi.ts
 * Purpose: Admin API wrapper. Uses shared HTTP client,
 * validates responses with Zod, and applies idempotency
 * patterns when applicable. All Rights Reserved.
 * Arodi Emmanuel
 */
import { fetchJson } from '../../../shared/http/fetchClient'
import { AdminEchoSchema, type AdminEcho } from '../model/AdminSchemas'

// Helper to attach an idempotency key when performing non-GET requests.
export function withIdempotency(
  headers: Record<string, string> | undefined,
  key?: string
): Record<string, string> {
  if (!key) return headers ?? {}
  return { ...(headers ?? {}), 'Idempotency-Key': key }
}

// Echo endpoint kept to wire module.
// Replace path when backend is ready.
export async function adminEcho(message: string): Promise<AdminEcho> {
  return AdminEchoSchema.parse(
    await fetchJson<unknown>('/api/v1/admin/echo', {
      method: 'POST',
      body: { message },
      headers: withIdempotency(undefined, `echo:${message}`),
    })
  )
}
