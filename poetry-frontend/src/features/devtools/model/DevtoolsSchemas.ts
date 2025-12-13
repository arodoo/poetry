/*
 * File: DevtoolsSchemas.ts
 * Purpose: Zod schemas for devtools feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const HardwareSlotSchema = z.object({
  slotId: z.number(),
  status: z.string(),
})

export type HardwareSlot = z.infer<typeof HardwareSlotSchema>
