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
import { extractSdkData } from '../../../shared/api/extractSdkData'

export async function createZone(input: CreateZoneInput): Promise<ZoneDetail> {
  const validatedInput = CreateZoneSchema.parse(input)
  const responseUnknown = (await createZoneSdk({
    body: validatedInput,
  } as unknown as Parameters<typeof createZoneSdk>[0])) as unknown
  const data = extractSdkData(responseUnknown) as ZoneResponse
  return parseZoneDetail(data)
}

export async function updateZone(
  id: string,
  input: UpdateZoneInput,
  etag?: string
): Promise<ZoneDetail> {
  const validatedInput = UpdateZoneSchema.parse(input)
  const headers = etag ? { 'If-Match': etag } : {}
  const responseUnknown = (await updateZoneSdk({
    path: { id: Number(id) },
    body: validatedInput,
    headers,
  } as unknown as Parameters<typeof updateZoneSdk>[0])) as unknown
  const data = extractSdkData(responseUnknown) as ZoneResponse
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
  } as unknown as Parameters<typeof deleteZoneSdk>[0])
}
