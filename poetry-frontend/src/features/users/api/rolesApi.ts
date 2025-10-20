/*
 * File: rolesApi.ts
 * Purpose: SDK client for roles endpoints.
 * Uses generated RoleDto and listRoles (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import { listRoles } from '../../../api/generated'
import type { RoleDto } from '../../../api/generated'

export async function fetchRoles(): Promise<readonly RoleDto[]> {
  const response = await listRoles()
  if (response.error || !response.data) {
    throw new Error('Failed to fetch roles')
  }
  return response.data as unknown as readonly RoleDto[]
}
