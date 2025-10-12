/*
 * File: SubscriptionsCommands.ts
 * Purpose: Zod runtime validation for subscription SDK request types.
 * Types are SDK types directly. Schemas add client-side validation only.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import type {
  SubscriptionCreateRequest,
  SubscriptionUpdateRequest,
} from '../../../api/generated'

/**
 * Runtime validation for SubscriptionCreateRequest.
 * TYPE = SubscriptionCreateRequest (SDK). SCHEMA = adds validation.
 *
 * @see {SubscriptionCreateRequest} from api/generated
 */
export type CreateSubscriptionInput = SubscriptionCreateRequest

export const CreateSubscriptionSchema: z.ZodType<CreateSubscriptionInput> =
  z.object({
    name: z.string().min(1, 'subscriptions.validation.name'),
    description: z.string().optional(),
    price: z.number().positive('subscriptions.validation.price'),
    currency: z
      .string()
      .length(3, 'subscriptions.validation.currency')
      .default('USD'),
    durationDays: z
      .number()
      .int()
      .positive('subscriptions.validation.durationDays'),
    features: z.array(z.string()).optional(),
    status: z.enum(['active', 'inactive']).default('active'),
  }) as z.ZodType<CreateSubscriptionInput>

/**
 * Runtime validation for SubscriptionUpdateRequest.
 * TYPE = SubscriptionUpdateRequest (SDK). SCHEMA = adds validation.
 *
 * @see {SubscriptionUpdateRequest} from api/generated
 */
export type UpdateSubscriptionInput = SubscriptionUpdateRequest

export const UpdateSubscriptionSchema: z.ZodType<UpdateSubscriptionInput> =
  z.object({
    name: z.string().min(1, 'subscriptions.validation.name').optional(),
    description: z.string().optional(),
    price: z.number().positive('subscriptions.validation.price').optional(),
    currency: z
      .string()
      .length(3, 'subscriptions.validation.currency')
      .optional(),
    durationDays: z
      .number()
      .int()
      .positive('subscriptions.validation.durationDays')
      .optional(),
    features: z.array(z.string()).optional(),
    status: z.enum(['active', 'inactive']).optional(),
  }) as z.ZodType<UpdateSubscriptionInput>
