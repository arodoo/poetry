/*
 * File: rolesApi.ts
 * Purpose: SDK client for roles endpoints.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import { tokenStorage } from '../../../shared/security/tokenStorage'

export const RoleSchema: z.ZodObject<{
  key: z.ZodString
  name: z.ZodString
}> = z.object({
  key: z.string(),
  name: z.string(),
})

export type Role = z.infer<typeof RoleSchema>

export const RolesListSchema: z.ZodArray<typeof RoleSchema> =
  z.array(RoleSchema)

export async function fetchRoles(): Promise<readonly Role[]> {
  const tokens: ReturnType<typeof tokenStorage.load> = tokenStorage.load()
  const authToken: string | null = tokens?.accessToken ?? null
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(authToken !== null && { Authorization: `Bearer ${authToken}` }),
  }
  const response: Response = await fetch('/api/v1/roles', {
    method: 'GET',
    headers,
  })
  if (!response.ok) {
    throw new Error(`roles.fetch.failed: ${String(response.status)}`)
  }
  const data: unknown = await response.json()
  return RolesListSchema.parse(data)
}
