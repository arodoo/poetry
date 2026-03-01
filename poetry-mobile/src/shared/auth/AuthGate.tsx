/*
 * File: AuthGate.tsx
 * Purpose: Route guard that redirects based on authentication state.
 * Renders a splash/loading screen while session is being restored,
 * then routes to login or protected content automatically. All
 * protected screens must be descendants of this component.
 * All Rights Reserved. Arodi Emmanuel
 */
import React, { ReactNode } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Redirect } from 'expo-router'
import { useAuth } from './AuthContext'

interface Props {
  children: ReactNode
  requireAuth: boolean
}

export function AuthGate({ children, requireAuth }: Props) {
  const { status } = useAuth()

  if (status === 'loading') {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (requireAuth && status === 'unauthenticated') {
    return <Redirect href="/(auth)/login" />
  }

  if (!requireAuth && status === 'authenticated') {
    return <Redirect href="/(app)/home" />
  }

  return <>{children}</>
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
