/*
 File: catalogs.ts
 Purpose: Provide catalog mapping and helper to ensure messages for a locale.
 All Rights Reserved. Arodi Emmanuel
*/
import { esCatalog } from './catalog/es'
import { enCatalog } from './catalog/en'
import type { Messages } from './types'

const catalogs: Record<string, Messages> = { es: esCatalog, en: enCatalog }

export function ensureMessages(loc: string, fallback: string): Messages {
  return catalogs[loc] ?? catalogs[fallback] ?? {}
}
