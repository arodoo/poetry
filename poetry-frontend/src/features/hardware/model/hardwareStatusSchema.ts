/*
 * File: hardwareStatusSchema.ts
 * Purpose: Zod schema for hardware status response validation.
 * Enforces type safety for backend API responses.
 * All Rights Reserved. Arodi Emmanuel
 */

import { z } from 'zod'

export const HardwareStatusSchema = z.object({
  connected: z.boolean(),
  readerModel: z.string().nullable(),
  sdkVersion: z.string().nullable(),
  errorMessage: z.string().nullable(),
  scanning: z.boolean(),
})

export type HardwareStatus = z.infer<typeof HardwareStatusSchema>
