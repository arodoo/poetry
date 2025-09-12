/*
 * File: AdminSchemas.ts
 * Purpose: Zod schemas and types for the admin feature. Kept minimal and
 * stable; expands alongside real endpoints. All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const AdminEchoSchema: z.ZodType<{ message: string }> = z
  .object({
    message: z.string().min(1, 'message.required').max(512),
  })
  .readonly()
export type AdminEcho = z.infer<typeof AdminEchoSchema>
