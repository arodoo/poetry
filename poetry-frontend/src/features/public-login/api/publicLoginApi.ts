/*
 * File: publicLoginApi.ts
 * Purpose: API wrapper for public login using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { LoginForm } from '../model/PublicLoginSchemas'
import { login as loginSdk, type LoginRequest } from '../../../api/generated'
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
  // reference optional AbortSignal param
  void _
  const response = await loginSdk({ body: requestBody })
  if (!response.data) {
    throw new Error('Login response missing data')
  }
  return AuthTokensSchema.parse(response.data)
}
