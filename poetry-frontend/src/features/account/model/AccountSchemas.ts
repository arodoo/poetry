/*
 * File: AccountSchemas.ts
 * Purpose: Defines account Zod schemas and payload types.
 * It uses generated SDK DTOs as the source boundary.
 * It keeps password validation aligned with shared policy.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import type {
  LocaleDto,
  PasswordChangeRequest,
} from '../../../api/generated'
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  isPasswordPolicyValid,
} from '../../../shared/security/passwordPolicy'

/**
 * Account schemas aligned with OpenAPI types.
 *
 * @see LocaleDto from api/generated.
 * @see PasswordChangeRequest from api/generated.
 */

export type { LocaleDto, PasswordChangeRequest }
export type AccountLocale = LocaleDto
export type AccountPasswordChange = PasswordChangeRequest

export const AccountLocaleSchema: z.ZodType<LocaleDto> = z
  .object({
    locale: z.string().min(2).max(16),
  })
  .readonly() as z.ZodType<LocaleDto>

export const AccountPasswordChangeSchema:
  z.ZodType<PasswordChangeRequest> = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH)
      .max(MAX_PASSWORD_LENGTH)
      .refine(isPasswordPolicyValid),
  })
  .readonly()

type AccountPasswordChangeRequest = AccountPasswordChange
export type { AccountPasswordChangeRequest }
