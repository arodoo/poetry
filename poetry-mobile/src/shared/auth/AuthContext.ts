/*
 * File: AuthContext.ts
 * Purpose: React context definition for authentication state.
 * Exposes session status, user data, and auth actions (login,
 * logout) to any component in the tree via useAuth hook.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createContext, useContext } from 'react'

export type AuthStatus =
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'

export interface AuthUser {
  id: string
  email: string
  displayName: string
  avatarUrl?: string
}

export interface AuthContextValue {
  status: AuthStatus
  user: AuthUser | null
  login: (user: AuthUser, tokens: TokenPair) => Promise<void>
  logout: () => Promise<void>
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

export const AuthContext = createContext<AuthContextValue | null>(
  null
)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return ctx
}
