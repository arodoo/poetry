/*
 File: errorMapper.ts
 Purpose: Map internal error codes to frontend i18n keys without
 altering backend localized messages. All Rights Reserved. Arodi Emmanuel
*/
import type { I18nKey } from './generated/keys'

const codeToKey: Record<string, I18nKey> = {
  // example mappings (extend in future tasks)
  'auth.invalid.credentials': 'ui.common.close', // placeholder reuse
}

export function mapErrorCodeToKey(code?: string): I18nKey | null {
  if (!code) return null
  return codeToKey[code] ?? null
}
