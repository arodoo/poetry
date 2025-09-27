/*
 * File: AccountSchemas.ts
 * Purpose: Zod schemas and types describing account-related payloads.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../../shared/security/passwordPolicy'

export interface AccountLocale {
  readonly locale: string
}

export const AccountLocaleSchema: z.ZodType<AccountLocale> = z
  .object({
    locale: z.string().min(2).max(16),
  })
  .readonly()

export interface AccountPasswordChange {
  readonly currentPassword: string
  readonly newPassword: string
}

export const AccountPasswordChangeSchema: z.ZodType<AccountPasswordChange> = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
  })
  .readonly()

type AccountPasswordChangeRequest = AccountPasswordChange
export type { AccountPasswordChangeRequest }
