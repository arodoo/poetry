/*
 * File: _layout.tsx
 * Purpose: Root layout that bootstraps the entire application tree.
 * Initializes i18n, wraps the app in QueryClientProvider and
 * AuthProvider, then delegates routing to Expo Router Stack.
 * All Rights Reserved. Arodi Emmanuel
 */
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../src/shared/auth/AuthProvider'
import { queryClient } from '../src/shared/query/queryClient'
import '../src/shared/i18n/index'

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </QueryClientProvider>
  )
}
