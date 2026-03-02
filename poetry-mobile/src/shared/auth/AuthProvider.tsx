/*
 * File: AuthProvider.tsx
 * Purpose: Provides authentication state to the entire app.
 * Manages status, user profile, subscription tier, and
 * backup consent. Delegates to extracted hooks for all
 * persistence and action logic.
 * All Rights Reserved. Arodi Emmanuel
 */
import React, { useState, useEffect, ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { UserProfile } from './UserProfile'
import { SubscriptionTier } from './SubscriptionTier'
import { BackupConsent } from './BackupConsent'
import { useAuthLoader } from './useAuthLoader'
import { useSessionActions } from './useSessionActions'
import { useProfileActions } from './useProfileActions'
import { useConsentActions } from './useConsentActions'

export function AuthProvider(
  { children }: { children: ReactNode }
) {
  const loaded = useAuthLoader()
  const [status, setStatus] = useState(loaded.status)
  const [user, setUser] =
    useState<UserProfile | null>(loaded.user)
  const [tier, setTier] =
    useState<SubscriptionTier>(loaded.tier)
  const [consent, setConsent] =
    useState<BackupConsent>(loaded.consent)

  useEffect(() => {
    setStatus(loaded.status)
    setUser(loaded.user)
    setTier(loaded.tier)
    setConsent(loaded.consent)
  }, [loaded])

  const session = useSessionActions(
    setStatus, setUser, setTier, setConsent
  )
  const profile = useProfileActions(
    user, setUser, setTier
  )
  const consentActs = useConsentActions(setConsent)

  return (
    <AuthContext.Provider
      value={{
        status, user, tier,
        backupConsent: consent,
        ...session,
        ...profile,
        ...consentActs,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

