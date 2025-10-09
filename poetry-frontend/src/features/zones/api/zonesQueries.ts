/*
 * File: zonesQueries.ts
 * Purpose: Query operations for zones using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  listAllZones as listZones,
  listPagedZones as getZonesPaged,
  getZoneById as getZoneById,
  type ZoneResponse,
  type PageResponseDtoZoneResponse,
} from '../../../api/generated'
import type { ZonesCollection, ZoneDetail } from '../model/ZonesSchemas'
import { parseZonesCollection, parseZoneDetail } from './zonesApiShared'

export async function fetchZonesList(): Promise<ZonesCollection> {
  const response = await listZones()
  const data = response.data as ZoneResponse[]
  return parseZonesCollection(data)
}

export async function fetchZonesPage(
  page: number,
  size: number,
  search?: string
): Promise<PageResponseDtoZoneResponse> {
  const response = await getZonesPaged({
    query: {
      page,
      size,
      ...(search ? { search } : {}),
    },
  })
  return response.data as PageResponseDtoZoneResponse
}

export async function fetchZoneById(id: string): Promise<ZoneDetail> {
  const response = await getZoneById({
    path: { id: Number(id) },
  })
  const data = response.data as ZoneResponse
  return parseZoneDetail(data)
}

