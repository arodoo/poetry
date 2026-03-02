/*
 * File: BackupConsent.ts
 * Purpose: Defines backup consent state and schema. Users must
 * explicitly opt-in to Google Drive backup. Tracks consent
 * status and timestamp for audit compliance.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const BackupConsentSchema = z.object({
  granted: z.boolean(),
  grantedAt: z.string().datetime().nullable(),
  revokedAt: z.string().datetime().nullable(),
})

export type BackupConsent = z.infer<
  typeof BackupConsentSchema
>

export const DEFAULT_CONSENT: BackupConsent = {
  granted: false,
  grantedAt: null,
  revokedAt: null,
}
