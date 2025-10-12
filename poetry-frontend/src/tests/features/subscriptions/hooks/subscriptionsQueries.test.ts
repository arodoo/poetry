/*
 * File: subscriptionsQueries.test.ts
 * Purpose: Validate subscriptions query keys and query hook configuration.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import {
  subscriptionsQueryKeys,
  useSubscriptionsListQuery,
} from '../../../../features/subscriptions/hooks/useSubscriptionsQueries'

describe('Subscriptions Queries Hook', () => {
  it('subscriptionsQueryKeys should build stable keys', () => {
    const listKey = subscriptionsQueryKeys.list()
    const pageKey = subscriptionsQueryKeys.page(1, 10, 'q')
    const detailKey = subscriptionsQueryKeys.detail('abc')
    expect(Array.isArray(listKey)).toBe(true)
    expect(listKey[0]).toBe('subscriptions')
    expect(pageKey[2]).toBe(1)
    expect(detailKey[2]).toBe('abc')
  })

  it('useSubscriptionsListQuery should be a function', () => {
    expect(typeof useSubscriptionsListQuery).toBe('function')
  })
})
