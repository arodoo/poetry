/*
 * File: authActions.ts
 * Purpose: Pure async functions for auth operations. Login
 * persists tokens+profile, logout clears all stores. Used
 * by AuthProvider to keep the provider component slim.
 * All Rights Reserved. Arodi Emmanuel
 */
import { tokenStorage } from './tokenStorage'
import { profileStore } from '../storage/profileStore'
import {
  subscriptionStore,
} from '../storage/subscriptionStore'
import {
  backupConsentStore,
} from '../storage/backupConsentStore'
import { UserProfile } from './UserProfile'
import { SubscriptionTier } from './SubscriptionTier'
import { BackupConsent } from './BackupConsent'
import { TokenPair } from './AuthContext'

export async function persistLogin(
  user: UserProfile,
  tokens: TokenPair
): Promise<void> {
  await tokenStorage.save(tokens)
  await profileStore.save(user)
}

export async function persistLogout(): Promise<void> {
  await Promise.all([
    tokenStorage.clear(),
    profileStore.clear(),
    subscriptionStore.clear(),
    backupConsentStore.clear(),
  ])
}

export async function persistProfile(
  profile: UserProfile
): Promise<void> {
  await profileStore.save(profile)
}

export async function persistTier(
  tier: SubscriptionTier
): Promise<void> {
  await subscriptionStore.save(tier)
}

export async function persistConsent(
  consent: BackupConsent
): Promise<void> {
  await backupConsentStore.save(consent)
}
