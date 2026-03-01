/*
 * File: home.tsx
 * Purpose: Home screen for authenticated users. First protected
 * screen after login, serves as the entry point for all app
 * features. Will host navigation to events, map, and profile.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useAuth } from '../../src/shared/auth/AuthContext'

export default function HomeScreen() {
  const { user, logout } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Poetry</Text>
      <Text style={styles.subtitle}>
        {user?.displayName ?? 'Welcome'}
      </Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
        accessibilityLabel="Logout"
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#666', marginBottom: 40 },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  logoutText: { fontSize: 14, color: '#333' },
})
