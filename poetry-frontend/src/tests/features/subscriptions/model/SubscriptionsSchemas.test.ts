/*
 * File: SubscriptionsSchemas.test.ts
 * Purpose: Validate exported types and zod schemas from subscriptions feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import type { CreateSubscriptionInput } from '../../../../features/subscriptions/model/SubscriptionsCommands'
import {
  CreateSubscriptionSchema,
  UpdateSubscriptionSchema,
} from '../../../../features/subscriptions/model/SubscriptionsCommands'

describe('Subscriptions Schemas', () => {
  it('CreateSubscriptionSchema should parse a valid payload', () => {
    const payload: CreateSubscriptionInput = {
      name: 'Monthly',
      price: 10,
      currency: 'USD',
      durationDays: 30,
      features: [],
      status: 'active',
    } as unknown as CreateSubscriptionInput
    const parsed = CreateSubscriptionSchema.safeParse(payload)
    expect(parsed.success).toBe(true)
  })

  it('UpdateSubscriptionSchema should accept partial updates', () => {
    const partial = { price: 5 }
    const parsed = UpdateSubscriptionSchema.safeParse(partial)
    expect(parsed.success).toBe(true)
  })
})
