/*
 * File: profileStore.test.ts
 * Purpose: Tests for profile persistence in SecureStore.
 * Simulates real user flows: save profile after login,
 * load profile on app restart, clear on logout.
 * All Rights Reserved. Arodi Emmanuel
 */
import * as SecureStore from 'expo-secure-store'
import { profileStore } from '../../shared/storage/profileStore'
import { UserProfile } from '../../shared/auth/UserProfile'

const store = SecureStore as unknown as {
  __clear: () => void
}

const MOCK_PROFILE: UserProfile = {
  id: 'user-123',
  email: 'maria@example.com',
  displayName: 'Maria Garcia',
  avatarUrl: 'https://example.com/avatar.jpg',
}

beforeEach(() => store.__clear())

describe('profileStore', () => {
  it('returns null when no profile saved', async () => {
    const result = await profileStore.load()
    expect(result).toBeNull()
  })

  it('saves and loads a user profile', async () => {
    await profileStore.save(MOCK_PROFILE)
    const loaded = await profileStore.load()
    expect(loaded).toEqual(MOCK_PROFILE)
  })

  it('clears profile on logout', async () => {
    await profileStore.save(MOCK_PROFILE)
    await profileStore.clear()
    const loaded = await profileStore.load()
    expect(loaded).toBeNull()
  })

  it('overwrites profile on re-login', async () => {
    await profileStore.save(MOCK_PROFILE)
    const updated = {
      ...MOCK_PROFILE,
      displayName: 'Maria G.',
    }
    await profileStore.save(updated)
    const loaded = await profileStore.load()
    expect(loaded?.displayName).toBe('Maria G.')
  })
})
