/*
 * File: profileStore.ts
 * Purpose: Persists user profile data in SecureStore. Profile
 * is loaded on app launch to restore the authenticated user
 * identity without requiring a network call.
 * All Rights Reserved. Arodi Emmanuel
 */
import * as SecureStore from 'expo-secure-store'
import {
  UserProfile,
  UserProfileSchema,
} from '../auth/UserProfile'
import { StorageError } from './StorageError'

const KEY = 'poetry.user.profile'

export const profileStore = {
  async save(profile: UserProfile): Promise<void> {
    try {
      const json = JSON.stringify(profile)
      await SecureStore.setItemAsync(KEY, json)
    } catch (err: unknown) {
      throw new StorageError(
        'profileStore.save',
        'Failed to persist user profile',
        err
      )
    }
  },

  async load(): Promise<UserProfile | null> {
    try {
      const raw = await SecureStore.getItemAsync(KEY)
      if (!raw) return null
      return UserProfileSchema.parse(JSON.parse(raw))
    } catch (err: unknown) {
      throw new StorageError(
        'profileStore.load',
        'Failed to load user profile',
        err
      )
    }
  },

  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(KEY)
  },
}
