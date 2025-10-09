/*
 * File: tokenRefreshScheduler.ts
 * Purpose: Background scheduler for proactive token refresh to maintain
 * long-term sessions. Checks token expiry at intervals and refreshes
 * before expiry to keep users logged in during active usage periods.
 * All Rights Reserved. Arodi Emmanuel
 */
import { tokenStorage } from './tokenStorage'
import { isTokenExpiringSoon, getTokenExpiryTime } from './tokenExpiry'
import { postRefresh } from '../../features/auth/api/authApi'

const CHECK_INTERVAL_MS: number = 60000
let intervalId: ReturnType<typeof setInterval> | null = null

async function checkAndRefreshToken(): Promise<void> {
  const tokens = tokenStorage.load()
  if (!tokens?.accessToken || !tokens?.refreshToken) {
    return
  }

  if (isTokenExpiringSoon(tokens.accessToken, 120)) {
    try {
      const response = await postRefresh(tokens.refreshToken)
      tokenStorage.save({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      })
    } catch {
      // Ignore refresh errors in background
    }
  }
}

export function startTokenRefreshScheduler(): void {
  if (intervalId) {
    return
  }
  intervalId = setInterval(() => {
    void checkAndRefreshToken()
  }, CHECK_INTERVAL_MS)
}

export function stopTokenRefreshScheduler(): void {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

export function scheduleNextRefresh(): void {
  const tokens = tokenStorage.load()
  if (!tokens?.accessToken) {
    return
  }
  const expiryTime = getTokenExpiryTime(tokens.accessToken)
  if (!expiryTime) {
    return
  }
  const now = Date.now()
  const timeUntilExpiry = expiryTime - now
  const refreshTime = Math.max(0, timeUntilExpiry - 120000)
  setTimeout(() => {
    void checkAndRefreshToken()
  }, refreshTime)
}
