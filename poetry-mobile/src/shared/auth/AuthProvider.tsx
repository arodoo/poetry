/*
 * File: AuthProvider.tsx
 * Purpose: Provides authentication state to the entire app tree.
 * Loads persisted tokens from SecureStore on mount to restore
 * session. Exposes login/logout actions that update state and
 * persist tokens securely. Foundation for Google OAuth flow.
 * All Rights Reserved. Arodi Emmanuel
 */
import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import {
  AuthContext,
  AuthStatus,
  AuthUser,
  TokenPair,
} from './AuthContext'
import { tokenStorage } from './tokenStorage'

interface Props {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    tokenStorage.load().then((tokens) => {
      if (tokens?.accessToken) {
        setStatus('authenticated')
      } else {
        setStatus('unauthenticated')
      }
    })
  }, [])

  const login = useCallback(
    async (authUser: AuthUser, tokens: TokenPair) => {
      await tokenStorage.save(tokens)
      setUser(authUser)
      setStatus('authenticated')
    },
    []
  )

  const logout = useCallback(async () => {
    await tokenStorage.clear()
    setUser(null)
    setStatus('unauthenticated')
  }, [])

  return (
    <AuthContext.Provider value={{ status, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
