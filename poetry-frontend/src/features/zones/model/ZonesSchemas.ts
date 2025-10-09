/*
 * File: ZonesSchemas.ts
 * Purpose: Aggregated re-exports for zones feature schemas.
 * Uses generated SDK types directly (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */

// Re-export SDK types directly - NO custom types
export type {
  ZoneResponse,
  ZoneCreateRequest,
  ZoneUpdateRequest,
} from '../../../api/generated'

// Type aliases for clarity (all point to ZoneResponse)
export type { ZoneResponse as Zone } from '../../../api/generated'
export type { ZoneResponse as ZoneDetail } from '../../../api/generated'
export type { ZoneResponse as ZoneSummary } from '../../../api/generated'

// Collection using SDK type directly
export type ZonesCollection =
  readonly import('../../../api/generated').ZoneResponse[]

// Zod input validation schemas (validate before sending to SDK)
// These add client-side validation on TOP of OpenAPI contracts
export {
  CreateZoneSchema,
  UpdateZoneSchema,
  type CreateZoneInput,
  type UpdateZoneInput,
} from './ZonesCommands'
