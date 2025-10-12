/*
 * File: zonesApiShared.ts
 * Purpose: Parsers for zones API responses.
 * Temporary: Direct parsing until SDK includes zones.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ZonesCollection, ZoneDetail } from '../model/ZonesSchemas'

export function parseZonesCollection(dto: unknown): ZonesCollection {
  // API types validated by backend OpenAPI contract
  return dto as ZonesCollection
}

export function parseZoneDetail(dto: unknown): ZoneDetail {
  // API types validated by backend OpenAPI contract
  return dto as ZoneDetail
}
