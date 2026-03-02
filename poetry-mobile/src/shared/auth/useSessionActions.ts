/*
 * File: useSessionActions.ts
 * Purpose: Hook providing login and logout callbacks for
 * AuthProvider. Persists tokens on login and clears all
 * stores on logout. Resets tier and consent to defaults.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useCallback } from 'react'
import { TokenPair } from './AuthContext'
import { AuthStatus } from './AuthContext'
import { UserProfile } from './UserProfile'
import { SubscriptionTier } from './SubscriptionTier'
import { DEFAULT_TIER } from './SubscriptionTier'
import { BackupConsent } from './BackupConsent'
import { DEFAULT_CONSENT } from './BackupConsent'
import * as actions from './authActions'

type Set<T> = (v: T) => void

export function useSessionActions(
  setStatus: Set<AuthStatus>,
  setUser: Set<UserProfile | null>,
  setTier: Set<SubscriptionTier>,
  setConsent: Set<BackupConsent>
) {
  const login = useCallback(
    async (u: UserProfile, t: TokenPair) => {
      await actions.persistLogin(u, t)
      setUser(u)
      setStatus('authenticated')
    },
    [setStatus, setUser]
  )

  const logout = useCallback(async () => {
    await actions.persistLogout()
    setUser(null)
    setTier(DEFAULT_TIER)
    setConsent(DEFAULT_CONSENT)
    setStatus('unauthenticated')
  }, [setStatus, setUser, setTier, setConsent])

  return { login, logout }
}
