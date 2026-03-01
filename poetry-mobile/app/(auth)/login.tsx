/*
 * File: login.tsx
 * Purpose: Login screen with Google Sign-In entry point.
 * Displays branding and a Google OAuth button. On success,
 * calls AuthProvider.login() to persist tokens and redirect.
 * Google credentials are obtained via expo-auth-session (future).
 * All Rights Reserved. Arodi Emmanuel
 */
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../src/shared/auth/AuthContext'

export default function LoginScreen() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  async function handleGoogleLogin() {
    setLoading(true)
    try {
      // Google OAuth via expo-auth-session — to be wired in next step
      const mockUser = {
        id: 'google-uid-placeholder',
        email: 'user@example.com',
        displayName: 'User',
      }
      const mockTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      }
      await login(mockUser, mockTokens)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.login.title')}</Text>
      <Text style={styles.subtitle}>{t('auth.login.subtitle')}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleGoogleLogin}
        disabled={loading}
        accessibilityLabel={t('auth.login.googleButton')}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {t('auth.login.googleButton')}
          </Text>
        )}
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
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40 },
  button: {
    backgroundColor: '#4285F4',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 220,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
})
