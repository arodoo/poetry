/*
 * File: publicLoginApi.ts
 * Purpose: API wrapper for public login using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { LoginForm } from '../model/PublicLoginSchemas'
import {
  login as loginSdk,
  type LoginRequest,
  type TokenResponse,
} from '../../../api/generated'
import {
  AuthTokensSchema,
  type AuthTokens,
} from '../../auth/model/AuthTokensSchemas'

export async function loginRequest(
  payload: LoginForm,
  _?: AbortSignal
): Promise<AuthTokens> {
  const requestBody: LoginRequest = {
    username: payload.username,
    password: payload.password,
  }
  // reference the optional AbortSignal parameter so linters don't mark it as unused
  void _
  const response = await loginSdk({ body: requestBody })
  const data = response.data as TokenResponse
  return AuthTokensSchema.parse(data)
}
