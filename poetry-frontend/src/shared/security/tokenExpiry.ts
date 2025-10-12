/*
 * File: tokenExpiry.ts
 * Purpose: JWT token expiration checking to enable proactive refresh.
 * Decodes access tokens to extract exp claim and determines if token
 * needs refresh before making requests. Uses configurable buffer time.
 * All Rights Reserved. Arodi Emmanuel
 */
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  exp?: number
  iat?: number
  sub?: string
}

const REFRESH_BUFFER_SECONDS = 60

export function isTokenExpiringSoon(
  accessToken: string,
  bufferSeconds: number = REFRESH_BUFFER_SECONDS
): boolean {
  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(accessToken)
    if (!decoded.exp) {
      return true
    }
    const nowSeconds: number = Math.floor(Date.now() / 1000)
    const expiresAt: number = decoded.exp
    const timeUntilExpiry: number = expiresAt - nowSeconds
    return timeUntilExpiry <= bufferSeconds
  } catch {
    return true
  }
}

export function getTokenExpiryTime(accessToken: string): number | null {
  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(accessToken)
    return decoded.exp ? decoded.exp * 1000 : null
  } catch {
    return null
  }
}
