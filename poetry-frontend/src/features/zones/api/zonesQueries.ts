/*
 * File: zonesQueries.ts
 * Purpose: Query operations for zones using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  listAll,
  listPaged,
  getById,
  type ZoneResponse,
  type PageResponseDtoZoneResponse,
} from '../../../api/generated'
import type { ZonesCollection, ZoneDetail } from '../model/ZonesSchemas'
import { parseZonesCollection, parseZoneDetail } from './zonesApiShared'

export async function fetchZonesList(): Promise<ZonesCollection> {
  const response = await listAll()
  const data = response.data as unknown as ZoneResponse[]
  return parseZonesCollection(data)
}

export async function fetchZonesPage(
  page: number,
  size: number,
  search?: string
): Promise<PageResponseDtoZoneResponse> {
  const response = await listPaged({
    query: {
      page,
      size,
      ...(search ? { search } : {}),
    },
  })
  return response.data as unknown as PageResponseDtoZoneResponse
}

export async function fetchZoneById(id: string): Promise<ZoneDetail> {
  const response = await getById({
    path: { id: Number(id) },
  })
  const data = response.data as unknown as ZoneResponse
  return parseZoneDetail(data)
}
