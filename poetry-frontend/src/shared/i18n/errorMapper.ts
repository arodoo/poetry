/*
 File: errorMapper.ts
 Purpose: Map internal error codes to frontend i18n keys without
 altering backend localized messages. All Rights Reserved. Arodi Emmanuel
*/

const codeToKey: Record<string, string> = {
  // example mappings (extend in future tasks)
  'auth.invalid.credentials': 'ui.common.close', // placeholder reuse
}

export function mapErrorCodeToKey(code?: string): string | null {
  if (!code) return null
  const val: string | undefined = codeToKey[code]
  return val ?? null
}
