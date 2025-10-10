/*
 * File: SubscriptionsSchemas.ts
 * Purpose: Aggregated re-exports for subscriptions feature schemas.
 * Uses generated SDK types directly (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */

// Re-export SDK types directly - NO custom types
export type {
  SubscriptionResponse,
  SubscriptionCreateRequest,
  SubscriptionUpdateRequest,
} from '../../../api/generated'

// Type aliases for clarity (all point to SubscriptionResponse)
export type { SubscriptionResponse as Subscription } from '../../../api/generated'
export type { SubscriptionResponse as SubscriptionDetail } from '../../../api/generated'
export type { SubscriptionResponse as SubscriptionSummary } from '../../../api/generated'

// Collection using SDK type directly
export type SubscriptionsCollection =
  readonly import('../../../api/generated').SubscriptionResponse[]

// Zod input validation schemas (validate before sending to SDK)
// These add client-side validation on TOP of OpenAPI contracts
export {
  CreateSubscriptionSchema,
  UpdateSubscriptionSchema,
  type CreateSubscriptionInput,
  type UpdateSubscriptionInput,
} from './SubscriptionsCommands'
