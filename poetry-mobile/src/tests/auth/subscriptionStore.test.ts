/*
 * File: subscriptionStore.test.ts
 * Purpose: Tests for subscription tier persistence. Simulates
 * tier validation at app launch, upgrade to Pro, and reset
 * to free tier on logout/downgrade.
 * All Rights Reserved. Arodi Emmanuel
 */
import * as SecureStore from 'expo-secure-store'
import {
  subscriptionStore,
} from '../../shared/storage/subscriptionStore'

const store = SecureStore as unknown as {
  __clear: () => void
}

beforeEach(() => store.__clear())

describe('subscriptionStore', () => {
  it('defaults to free when nothing stored', async () => {
    const tier = await subscriptionStore.load()
    expect(tier).toBe('free')
  })

  it('persists pro tier after upgrade', async () => {
    await subscriptionStore.save('pro')
    const tier = await subscriptionStore.load()
    expect(tier).toBe('pro')
  })

  it('reverts to free after clear', async () => {
    await subscriptionStore.save('pro')
    await subscriptionStore.clear()
    const tier = await subscriptionStore.load()
    expect(tier).toBe('free')
  })

  it('handles corrupted data gracefully', async () => {
    await SecureStore.setItemAsync(
      'poetry.subscription.tier',
      'invalid-tier'
    )
    const tier = await subscriptionStore.load()
    expect(tier).toBe('free')
  })
})
