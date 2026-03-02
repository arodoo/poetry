/*
 * File: subscriptionStore.ts
 * Purpose: Persists the subscription tier in SecureStore.
 * Loaded at startup to determine feature gating. Validated
 * against backend periodically when network is available.
 * All Rights Reserved. Arodi Emmanuel
 */
import * as SecureStore from 'expo-secure-store'
import {
  SubscriptionTier,
  SubscriptionTierSchema,
  DEFAULT_TIER,
} from '../auth/SubscriptionTier'
import { StorageError } from './StorageError'

const KEY = 'poetry.subscription.tier'

export const subscriptionStore = {
  async save(tier: SubscriptionTier): Promise<void> {
    try {
      await SecureStore.setItemAsync(KEY, tier)
    } catch (err: unknown) {
      throw new StorageError(
        'subscriptionStore.save',
        'Failed to persist subscription tier',
        err
      )
    }
  },

  async load(): Promise<SubscriptionTier> {
    try {
      const raw = await SecureStore.getItemAsync(KEY)
      if (!raw) return DEFAULT_TIER
      return SubscriptionTierSchema.parse(raw)
    } catch {
      return DEFAULT_TIER
    }
  },

  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(KEY)
  },
}
