/*
 * File: useAuthLoader.ts
 * Purpose: Hook that loads all persisted auth state on mount.
 * Restores tokens, user profile, subscription tier, and
 * backup consent from SecureStore to hydrate AuthProvider.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useEffect, useState } from 'react'
import { tokenStorage } from './tokenStorage'
import { profileStore } from '../storage/profileStore'
import { subscriptionStore } from '../storage/subscriptionStore'
import { backupConsentStore } from '../storage/backupConsentStore'
import { UserProfile } from './UserProfile'
import { SubscriptionTier, DEFAULT_TIER } from './SubscriptionTier'
import { BackupConsent, DEFAULT_CONSENT } from './BackupConsent'
import { AuthStatus } from './AuthContext'

export interface AuthLoadedState {
  status: AuthStatus
  user: UserProfile | null
  tier: SubscriptionTier
  consent: BackupConsent
}

const INITIAL: AuthLoadedState = {
  status: 'loading',
  user: null,
  tier: DEFAULT_TIER,
  consent: DEFAULT_CONSENT,
}

export function useAuthLoader(): AuthLoadedState {
  const [state, setState] =
    useState<AuthLoadedState>(INITIAL)
  useEffect(() => { loadAll().then(setState) }, [])
  return state
}

async function loadAll(): Promise<AuthLoadedState> {
  const [tokens, user, tier, consent] =
    await Promise.all([
      tokenStorage.load(),
      profileStore.load().catch(() => null),
      subscriptionStore.load(),
      backupConsentStore.load(),
    ])
  const hasSession = Boolean(tokens?.accessToken)
  return {
    status: hasSession
      ? 'authenticated'
      : 'unauthenticated',
    user: hasSession ? user : null,
    tier,
    consent,
  }
}
