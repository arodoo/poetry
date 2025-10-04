/*
 * File: SellerCodesSchemas.ts
 * Purpose: Aggregated re-exports for seller codes feature schemas.
 * Uses generated SDK types directly (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */

// Re-export SDK types directly - NO custom types
export type {
  SellerCodeResponse,
  SellerCodeCreateRequest,
  SellerCodeUpdateRequest,
} from '../../../api/generated'

// Type aliases for clarity (all point to SellerCodeResponse)
export type { SellerCodeResponse as SellerCode } from '../../../api/generated'
export type { SellerCodeResponse as SellerCodeDetail } from '../../../api/generated'
export type { SellerCodeResponse as SellerCodeSummary } from '../../../api/generated'

// Collection using SDK type directly
export type SellerCodesCollection =
  readonly import('../../../api/generated').SellerCodeResponse[]

// Zod input validation schemas (validate before sending to SDK)
// These add client-side validation on TOP of OpenAPI contracts
export {
  CreateSellerCodeSchema,
  UpdateSellerCodeSchema,
  type CreateSellerCodeInput,
  type UpdateSellerCodeInput,
} from './SellerCodesCommands'
