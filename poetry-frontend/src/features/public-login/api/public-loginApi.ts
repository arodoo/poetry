/*
 * File: public-loginApi.ts
 * Purpose: Public login API wrapper with runtime validation using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */
import { login as loginSdk } from '../../../api/generated'
import {
  PublicLoginRequestSchema,
  PublicLoginResultSchema,
  type PublicLoginRequest,
  type PublicLoginResult,
} from '../model/PublicLoginSchemas'

export async function submitPublicLogin(
  input: PublicLoginRequest
): Promise<PublicLoginResult> {
  const payload: PublicLoginRequest = PublicLoginRequestSchema.parse(input)
  const response = await loginSdk({
    body: {
      username: payload.username,
      password: payload.password,
    },
  })
  return PublicLoginResultSchema.parse(response.data)
}
