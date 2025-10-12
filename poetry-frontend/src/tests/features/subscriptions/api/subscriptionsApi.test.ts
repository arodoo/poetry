/*
 * File: subscriptionsApi.test.ts
 * Purpose: Validate that subscriptions API re-exports exist and basic functions are callable.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import * as api from '../../../../features/subscriptions/api/subscriptionsApi'

describe('Subscriptions API', () => {
  it('should export fetchSubscriptionsList and friends', () => {
    expect(typeof api.fetchSubscriptionsList).toBe('function')
    expect(typeof api.fetchSubscriptionsPage).toBe('function')
    expect(typeof api.fetchSubscriptionById).toBe('function')
  })
})