/*
 * File: tokenRefresh.ts
 * Purpose: Handle authorization refresh attempts so the main performer
 * stays focused on retry orchestration work.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type Tokens, type RefreshFn } from './requestTypes'

export async function tryRefreshAuthorization(
  response: Response,
  attempt: number,
  tokens: Tokens,
  refreshTokenIfNeeded: RefreshFn,
  headers: Record<string, string>
): Promise<boolean> {
  const firstAttempt: boolean = attempt === 1
  const hasRefreshToken: boolean = Boolean(tokens?.refreshToken)
  const shouldRefresh: boolean =
    response.status === 401 && firstAttempt && hasRefreshToken
  if (!shouldRefresh) {
    return false
  }
  try {
    const refreshed: { accessToken: string } | null =
      await refreshTokenIfNeeded()
    if (!refreshed) {
      return false
    }
    headers['Authorization'] = `Bearer ${refreshed.accessToken}`
    return true
  } catch (error: unknown) {
    void error
    return false
  }
}
