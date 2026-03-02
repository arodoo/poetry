/*
 * File: useConsentActions.ts
 * Purpose: Hook providing backup consent grant and revoke
 * actions. Persists consent state with timestamps for audit
 * compliance. Separated for 60-line file limit.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useCallback } from 'react'
import { BackupConsent } from './BackupConsent'
import * as actions from './authActions'

type SetFn<T> = (val: T) => void

export function useConsentActions(
  setConsent: SetFn<BackupConsent>
) {
  const grantBackupConsent = useCallback(async () => {
    const c: BackupConsent = {
      granted: true,
      grantedAt: new Date().toISOString(),
      revokedAt: null,
    }
    await actions.persistConsent(c)
    setConsent(c)
  }, [setConsent])

  const revokeBackupConsent = useCallback(async () => {
    const c: BackupConsent = {
      granted: false,
      grantedAt: null,
      revokedAt: new Date().toISOString(),
    }
    await actions.persistConsent(c)
    setConsent(c)
  }, [setConsent])

  return { grantBackupConsent, revokeBackupConsent }
}
