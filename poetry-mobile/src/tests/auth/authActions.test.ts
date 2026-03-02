/*
 * File: authActions.test.ts
 * Purpose: Tests for auth action functions. Simulates real
 * persistence flows: login saves tokens+profile, logout
 * clears everything. Verifies store isolation.
 * All Rights Reserved. Arodi Emmanuel
 */
import * as SecureStore from 'expo-secure-store'
import * as actions from '../../shared/auth/authActions'
import { profileStore } from '../../shared/storage/profileStore'
import { subscriptionStore } from '../../shared/storage/subscriptionStore'
import { backupConsentStore } from '../../shared/storage/backupConsentStore'
import { tokenStorage } from '../../shared/auth/tokenStorage'

const store = SecureStore as unknown as {
  __clear: () => void
}

const MOCK_USER = {
  id: 'uid-456',
  email: 'carlos@example.com',
  displayName: 'Carlos Ruiz',
}

const MOCK_TOKENS = {
  accessToken: 'at-abc123',
  refreshToken: 'rt-def456',
}

beforeEach(() => store.__clear())

describe('authActions', () => {
  it('persistLogin saves tokens and profile', async () => {
    await actions.persistLogin(MOCK_USER, MOCK_TOKENS)
    const tokens = await tokenStorage.load()
    const profile = await profileStore.load()
    expect(tokens?.accessToken).toBe('at-abc123')
    expect(profile?.email).toBe('carlos@example.com')
  })

  it('persistLogout clears all stores', async () => {
    await actions.persistLogin(MOCK_USER, MOCK_TOKENS)
    await actions.persistTier('pro')
    await actions.persistConsent({
      granted: true,
      grantedAt: new Date().toISOString(),
      revokedAt: null,
    })
    await actions.persistLogout()
    const tokens = await tokenStorage.load()
    const profile = await profileStore.load()
    const tier = await subscriptionStore.load()
    const consent = await backupConsentStore.load()
    expect(tokens).toBeNull()
    expect(profile).toBeNull()
    expect(tier).toBe('free')
    expect(consent.granted).toBe(false)
  })
})
