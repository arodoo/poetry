/*
 * File: backupConsentStore.ts
 * Purpose: Persists backup consent state in SecureStore. Tracks
 * whether the user opted-in to Google Drive backup, with
 * timestamps for grant and revocation for audit compliance.
 * All Rights Reserved. Arodi Emmanuel
 */
import * as SecureStore from 'expo-secure-store'
import {
  BackupConsent,
  BackupConsentSchema,
  DEFAULT_CONSENT,
} from '../auth/BackupConsent'
import { StorageError } from './StorageError'

const KEY = 'poetry.backup.consent'

export const backupConsentStore = {
  async save(consent: BackupConsent): Promise<void> {
    try {
      const json = JSON.stringify(consent)
      await SecureStore.setItemAsync(KEY, json)
    } catch (err: unknown) {
      throw new StorageError(
        'backupConsentStore.save',
        'Failed to persist backup consent',
        err
      )
    }
  },

  async load(): Promise<BackupConsent> {
    try {
      const raw = await SecureStore.getItemAsync(KEY)
      if (!raw) return DEFAULT_CONSENT
      return BackupConsentSchema.parse(JSON.parse(raw))
    } catch {
      return DEFAULT_CONSENT
    }
  },

  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(KEY)
  },
}
