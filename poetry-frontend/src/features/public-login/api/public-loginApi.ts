/*
 * File: public-loginApi.ts
 * Purpose: Public login API wrapper with runtime validation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { postPublicLogin } from '../../../shared/sdk'
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
  const response: unknown = await postPublicLogin(payload)
  return PublicLoginResultSchema.parse(response)
}
