/*
 * File: adminApi.ts
 * Purpose: Placeholder API wrapper for admin feature. Provides a
 * typed echo function to satisfy the module structure. Real calls
 * will be added when admin endpoints exist.
 * All Rights Reserved. Arodi Emmanuel TODO
 */
import type { AdminEcho } from '../model/AdminSchemas'

export async function adminEcho(message: string): Promise<AdminEcho> {
  return Promise.resolve({ message })
}
