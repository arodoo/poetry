/*
 File: zoneEditUtils.ts
 Purpose: Small utilities for the Zone edit page. The helpers centralize
 creation of the initial form state so the page component stays focused on
 composition and rendering. These utilities intentionally contain only
 shaping logic and no side-effects. All Rights Reserved. Arodi Emmanuel
*/
import type { ZoneResponse } from '../model/ZonesSchemas'

export function createInitialZoneFormState(zone?: ZoneResponse):
  | {
      name: string
      description: string
      managerId: string
      status: 'active' | 'inactive'
    }
  | undefined {
  const zoneStatus = zone?.status
    ? (zone.status as 'active' | 'inactive')
    : 'active'
  return zone
    ? {
        name: zone.name ?? '',
        description: zone.description ?? '',
        managerId: zone.managerId ? String(zone.managerId) : '',
        status: zoneStatus,
      }
    : undefined
}
