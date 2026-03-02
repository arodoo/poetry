/*
 * File: backupConsentStore.test.ts
 * Purpose: Tests for backup consent persistence. Simulates
 * granting, revoking, and clearing consent with timestamps.
 * All Rights Reserved. Arodi Emmanuel
 */
import * as SecureStore from 'expo-secure-store'
import { backupConsentStore } from '../../shared/storage/backupConsentStore'
import { BackupConsent } from '../../shared/auth/BackupConsent'

const ss = SecureStore as unknown as { __clear: () => void }
beforeEach(() => ss.__clear())

describe('backupConsentStore', () => {
  it('defaults to no consent', async () => {
    const c = await backupConsentStore.load()
    expect(c.granted).toBe(false)
    expect(c.grantedAt).toBeNull()
  })

  it('persists granted consent', async () => {
    const now = new Date().toISOString()
    const c: BackupConsent = {
      granted: true, grantedAt: now, revokedAt: null,
    }
    await backupConsentStore.save(c)
    const loaded = await backupConsentStore.load()
    expect(loaded.granted).toBe(true)
    expect(loaded.grantedAt).toBe(now)
  })

  it('persists revocation', async () => {
    const now = new Date().toISOString()
    const c: BackupConsent = {
      granted: false, grantedAt: null, revokedAt: now,
    }
    await backupConsentStore.save(c)
    const loaded = await backupConsentStore.load()
    expect(loaded.granted).toBe(false)
    expect(loaded.revokedAt).toBe(now)
  })

  it('resets to default after clear', async () => {
    await backupConsentStore.save({
      granted: true,
      grantedAt: new Date().toISOString(),
      revokedAt: null,
    })
    await backupConsentStore.clear()
    const loaded = await backupConsentStore.load()
    expect(loaded.granted).toBe(false)
  })
})
