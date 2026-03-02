/*
 * File: userJourney.test.ts
 * Purpose: End-to-end simulation of a real user journey:
 * install → login → upgrade → backup → profile → logout.
 * All Rights Reserved. Arodi Emmanuel
 */
import * as SecureStore from 'expo-secure-store'
import * as actions from '../../shared/auth/authActions'
import { profileStore } from '../../shared/storage/profileStore'
import { subscriptionStore } from '../../shared/storage/subscriptionStore'
import { backupConsentStore } from '../../shared/storage/backupConsentStore'
import { tokenStorage } from '../../shared/auth/tokenStorage'

const ss = SecureStore as unknown as { __clear: () => void }
beforeEach(() => ss.__clear())

const USER = {
  id: 'g-789',
  email: 'ana@gmail.com',
  displayName: 'Ana Torres',
}
const TOKENS = { accessToken: 'at', refreshToken: 'rt' }

describe('full user journey', () => {
  it('install → login → pro → backup → logout', async () => {
    expect(await tokenStorage.load()).toBeNull()
    expect(await subscriptionStore.load()).toBe('free')

    await actions.persistLogin(USER, TOKENS)
    const p = await profileStore.load()
    expect(p?.displayName).toBe('Ana Torres')

    await actions.persistTier('pro')
    expect(await subscriptionStore.load()).toBe('pro')

    await actions.persistConsent({
      granted: true,
      grantedAt: new Date().toISOString(),
      revokedAt: null,
    })
    const c = await backupConsentStore.load()
    expect(c.granted).toBe(true)

    await actions.persistProfile({
      ...USER, displayName: 'Ana T.',
    })
    const r = await profileStore.load()
    expect(r?.displayName).toBe('Ana T.')

    await actions.persistLogout()
    expect(await tokenStorage.load()).toBeNull()
    expect(await subscriptionStore.load()).toBe('free')
  })
})
