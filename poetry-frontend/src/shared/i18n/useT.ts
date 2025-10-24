/*
 File: useT.ts
 Purpose: Hook exposing strict translate function from i18n context.
 Throws if context missing. All Rights Reserved. Arodi Emmanuel
*/
import { useContext } from 'react'
import { I18nCtx } from './context'
import type { I18nState } from './types'
import type { I18nKey } from './generated/keys'

export function useT(): (
  key: I18nKey,
  vars?: Record<string, unknown>
) => string {
  const ctx: I18nState | null = useContext(I18nCtx)
  if (!ctx) throw new Error('i18n.context.missing')
  return (key: I18nKey, vars?: Record<string, unknown>): string =>
    ctx.t(key, vars)
}
