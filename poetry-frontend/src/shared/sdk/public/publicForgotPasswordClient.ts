/*
 * File: publicForgotPasswordClient.ts
 * Purpose: SDK helper for public forgot-password endpoint using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */
import { forgotPassword } from '../../../api/generated'
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from '../../../api/generated'
import { createIdempotencyKey } from '../../http/idempotency'

export type { ForgotPasswordRequest, ForgotPasswordResponse }
export type PublicForgotPasswordRequestDto = ForgotPasswordRequest
export type PublicForgotPasswordResponseDto = ForgotPasswordResponse

export async function sendForgotPasswordRequest(
  body: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> {
  const response = await forgotPassword({
    body,
    headers: {
      'Idempotency-Key': createIdempotencyKey(),
    },
  })
  if (response.error || !response.data) {
    throw new Error('Failed to send forgot password request')
  }
  return (response.data as unknown) as ForgotPasswordResponse
}

export function postPublicForgotPassword(
  body: PublicForgotPasswordRequestDto
): Promise<PublicForgotPasswordResponseDto> {
  return sendForgotPasswordRequest(body)
}
