/*
 * File: AuthContext.ts
 * Purpose: React context definition for authentication state.
 * Exposes session status, user profile, subscription tier,
 * backup consent, and auth actions via useAuth hook.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createContext, useContext } from 'react'
import { UserProfile } from './UserProfile'
import { SubscriptionTier } from './SubscriptionTier'
import { BackupConsent } from './BackupConsent'

export type AuthStatus =
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

export interface AuthContextValue {
  status: AuthStatus
  user: UserProfile | null
  tier: SubscriptionTier
  backupConsent: BackupConsent
  login: (
    user: UserProfile,
    tokens: TokenPair
  ) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (
    profile: Partial<UserProfile>
  ) => Promise<void>
  setTier: (tier: SubscriptionTier) => Promise<void>
  grantBackupConsent: () => Promise<void>
  revokeBackupConsent: () => Promise<void>
}

export const AuthContext =
  createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    )
  }
  return ctx
}
