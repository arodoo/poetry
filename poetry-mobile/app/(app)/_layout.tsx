/*
 * File: _layout.tsx
 * Purpose: Layout for authenticated routes (app group).
 * Uses AuthGate to redirect unauthenticated users to login
 * before any protected screen is rendered. All feature screens
 * must live inside this group.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import { Stack } from 'expo-router'
import { AuthGate } from '../../src/shared/auth/AuthGate'

export default function AppLayout() {
  return (
    <AuthGate requireAuth={true}>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthGate>
  )
}
