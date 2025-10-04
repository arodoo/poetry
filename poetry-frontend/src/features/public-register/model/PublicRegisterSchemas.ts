/*
 * File: PublicRegisterSchemas.ts
 * Purpose: Zod runtime validation for SDK request types.
 * Types are SDK types directly. Schemas add client-side validation only.
 * All Rights Reserved. Arodi Emmanuel
 */

import { z } from 'zod'
import type { RegisterRequest, TokenResponse } from '../../../api/generated'

/**
 * Runtime validation for RegisterRequest.
 * TYPE = RegisterRequest (SDK). SCHEMA = adds email/password validation.
 *
 * @see {RegisterRequest} from api/generated - OpenAPI source of truth
 */
export type PublicRegisterRequest = RegisterRequest

export const PublicRegisterRequestSchema: z.ZodType<PublicRegisterRequest> = z.object({
  username: z.string().min(1, 'register.username.required'),
  email: z.string().email('register.email.invalid'),
  password: z.string().min(6, 'register.password.min'),
}) as z.ZodType<PublicRegisterRequest>

/**
 * Runtime validation for TokenResponse.
 *
 * @see {TokenResponse} from api/generated - OpenAPI source of truth
 */
export type PublicRegisterResult = TokenResponse

export const PublicRegisterResultSchema: z.ZodType<PublicRegisterResult> = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
}) as z.ZodType<PublicRegisterResult>
