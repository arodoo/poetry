/*
 * File: public-forgot-passwordApi.ts
 * Purpose: Forgot-password API wrapper with runtime validation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { postPublicForgotPassword } from '../../../shared/sdk'
import {
  PublicForgotPasswordRequestSchema,
  PublicForgotPasswordResultSchema,
  type PublicForgotPasswordRequest,
  type PublicForgotPasswordResult,
} from '../model/PublicForgotPasswordSchemas'

export async function submitPublicForgotPassword(
  input: PublicForgotPasswordRequest
): Promise<PublicForgotPasswordResult> {
  const payload: PublicForgotPasswordRequest =
    PublicForgotPasswordRequestSchema.parse(input)
  const response: unknown = await postPublicForgotPassword(payload)
  return PublicForgotPasswordResultSchema.parse(response)
}
