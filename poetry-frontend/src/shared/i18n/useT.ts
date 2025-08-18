/*
 File: useT.ts
 Purpose: Hook to expose a translate function derived from I18n context.
 Separating this from the provider keeps fast-refresh happy and the
 file sizes small per repository rules. All Rights Reserved. Arodi
 Emmanuel
*/
import { useContext } from 'react'
import { I18nCtx } from './context'
import type { I18nState } from './index'

export function useT(): (key: string) => string {
  const ctx: I18nState | null = useContext(I18nCtx)
  return (key: string): string => {
    if (!ctx) return key
    return ctx.messages[key] ?? key
  }
}
