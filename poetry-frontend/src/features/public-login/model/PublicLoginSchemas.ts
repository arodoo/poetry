/*
 * File: PublicLoginSchemas.ts
 * Purpose: Zod runtime validation for SDK request types.
 * Types are SDK types directly. Schemas add client-side validation only.
 * All Rights Reserved. Arodi Emmanuel
 */

import { z } from 'zod'
import type { LoginRequest } from '../../../api/generated'

/**
 * Runtime validation for LoginRequest.
 * TYPE = LoginRequest (SDK). SCHEMA = adds min length validation.
 *
 * @see {LoginRequest} from api/generated - OpenAPI source of truth
 */
export type PublicLoginRequest = LoginRequest

export const PublicLoginRequestSchema: z.ZodType<PublicLoginRequest> = z.object(
  {
    username: z.string().min(1, 'ui.publicLogin.errors.username'),
    password: z.string().min(1, 'ui.publicLogin.errors.password'),
  }
) as z.ZodType<PublicLoginRequest>

export const LoginFormSchema: z.ZodType<PublicLoginRequest> =
  PublicLoginRequestSchema
export type LoginForm = PublicLoginRequest

/**
 * Runtime validation for TokenResponse (login result).
 *
 * @see {TokenResponse} from api/generated - OpenAPI source of truth
 */
export type PublicLoginResult = import('../../../api/generated').TokenResponse

export const PublicLoginResultSchema: z.ZodType<PublicLoginResult> = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
}) as z.ZodType<PublicLoginResult>
