/*
 * File: SubscriptionsPage.test.ts
 * Purpose: Smoke test for Subscriptions page component import.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import SubscriptionsListPage from '../../../../features/subscriptions/pages/SubscriptionsListPage'

describe('SubscriptionsPage', () => {
  it('should import SubscriptionsListPage component', () => {
    expect(typeof SubscriptionsListPage).toBe('function')
  })
})
