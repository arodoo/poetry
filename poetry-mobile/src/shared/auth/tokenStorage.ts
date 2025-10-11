/*
 * File: tokenStorage.ts
 * Purpose: Secure JWT token storage using Expo SecureStore.
 * Never use AsyncStorage or localStorage for sensitive auth tokens.
 * Provides async save, load, and clear operations for token bundles.
 * All Rights Reserved. Arodi Emmanuel
 */
import * as SecureStore from 'expo-secure-store'

const TOKEN_KEY = 'poetry.auth.tokens'

export interface TokenBundle {
  accessToken: string
  refreshToken: string
}

export const tokenStorage = {
  async save(tokens: TokenBundle): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(tokens))
  },

  async load(): Promise<TokenBundle | null> {
    const raw = await SecureStore.getItemAsync(TOKEN_KEY)
    return raw ? JSON.parse(raw) : null
  },

  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY)
  },
}
