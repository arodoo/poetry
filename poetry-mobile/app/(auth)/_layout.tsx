/*
 * File: _layout.tsx
 * Purpose: Layout for unauthenticated routes (auth group).
 * Uses AuthGate to redirect already-authenticated users away
 * from the login screen automatically. Keeps auth routes clean.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import { Stack } from 'expo-router'
import { AuthGate } from '../../src/shared/auth/AuthGate'

export default function AuthLayout() {
  return (
    <AuthGate requireAuth={false}>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthGate>
  )
}
