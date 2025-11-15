/*
 * File: authApi.ts
 * Purpose: Auth API wrapper using generated SDK functions.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  login as loginSdk,
  refresh as refreshSdk,
  logout as logoutSdk,
  status as statusSdk,
  me as meSdk,
  type LoginRequest,
  type RefreshRequest,
} from '../../../api/generated'
import { AuthStatusSchema, type AuthStatus } from '../model/AuthSchemas'
import {
  AuthTokensSchema,
  type AuthTokens,
  MeSchema,
  type Me,
} from '../model/AuthTokensSchemas'

export async function getAuthStatus(): Promise<AuthStatus> {
  const response = await statusSdk()
  return AuthStatusSchema.parse(response.data)
}

export async function postLogin(
  username: string,
  password: string
): Promise<AuthTokens> {
  const requestBody: LoginRequest = { username, password }
  const response = await loginSdk({ body: requestBody })
  if (!response.data) {
    throw new Error('Login response missing data')
  }
  return AuthTokensSchema.parse(response.data)
}

export async function postRefresh(refreshToken: string): Promise<AuthTokens> {
  const requestBody: RefreshRequest = { refreshToken }
  const response = await refreshSdk({ body: requestBody })
  if (!response.data) {
    throw new Error('Refresh response missing data')
  }
  return AuthTokensSchema.parse(response.data)
}

export async function postLogout(refreshToken: string): Promise<void> {
  const requestBody: RefreshRequest = { refreshToken }
  await logoutSdk({ body: requestBody })
}

export async function getMe(): Promise<Me> {
  const response = await meSdk()
  return MeSchema.parse(response.data)
}
