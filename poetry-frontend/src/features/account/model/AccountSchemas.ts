/*
 * File: AccountSchemas.ts
 * Purpose: Zod schemas and types describing account-related payloads.
 * Uses generated LocaleDto and PasswordChangeRequest as foundation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import type { LocaleDto, PasswordChangeRequest } from '../../../api/generated'
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../../shared/security/passwordPolicy'

/**
 * Account schemas aligned with generated types from OpenAPI.
 *
 * @see {LocaleDto} from api/generated - OpenAPI source of truth
 * @see {PasswordChangeRequest} from api/generated - OpenAPI source of truth
 */

export type { LocaleDto, PasswordChangeRequest }
export type AccountLocale = LocaleDto
export type AccountPasswordChange = PasswordChangeRequest

export const AccountLocaleSchema: z.ZodType<LocaleDto> = z
  .object({
    locale: z.string().min(2).max(16),
  })
  .readonly() as z.ZodType<LocaleDto>

export const AccountPasswordChangeSchema: z.ZodType<PasswordChangeRequest> = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
  })
  .readonly()

type AccountPasswordChangeRequest = AccountPasswordChange
export type { AccountPasswordChangeRequest }
