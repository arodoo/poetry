/*
 * File: index.tsx
 * Purpose: Root entry route that redirects to the auth flow.
 * Expo Router renders this first. AuthGate in each group layout
 * handles final destination based on session state.
 * All Rights Reserved. Arodi Emmanuel
 */
import { Redirect } from 'expo-router'

export default function Index() {
  return <Redirect href="/(auth)/login" />
}
