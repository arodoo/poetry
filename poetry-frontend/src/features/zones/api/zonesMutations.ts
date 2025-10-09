/*
 * File: zonesMutations.ts
 * Purpose: Mutation operations using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  createZone as createZoneSdk,
  updateZone as updateZoneSdk,
  deleteZone as deleteZoneSdk,
  type ZoneResponse,
} from '../../../api/generated'
import {
  CreateZoneSchema,
  UpdateZoneSchema,
  type CreateZoneInput,
  type UpdateZoneInput,
  type ZoneDetail,
} from '../model/ZonesSchemas'
import { parseZoneDetail } from './zonesApiShared'

export async function createZone(
  input: CreateZoneInput
): Promise<ZoneDetail> {
  const validatedInput = CreateZoneSchema.parse(input)
  const response = await createZoneSdk({
    body: validatedInput as any,
  })
  const data = response.data as ZoneResponse
  return parseZoneDetail(data)
}

export async function updateZone(
  id: string,
  input: UpdateZoneInput,
  etag?: string
): Promise<ZoneDetail> {
  const validatedInput = UpdateZoneSchema.parse(input)
  const headers = etag ? { 'If-Match': etag } : {}
  const response = await updateZoneSdk({
    path: { id: Number(id) },
    body: validatedInput as any,
    headers,
  })
  const data = response.data as ZoneResponse
  return parseZoneDetail(data)
}

export async function deleteZone(
  id: string,
  version: number,
  etag?: string
): Promise<void> {
  const headers = etag ? { 'If-Match': etag } : {}
  await deleteZoneSdk({
    path: { id: Number(id) },
    query: { version },
    headers,
  } as any)
}



