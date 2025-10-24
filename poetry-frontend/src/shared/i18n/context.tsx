/*
 File: context.tsx
 Purpose: React context for i18n state. Split from provider to satisfy
 fast-refresh rule and keep files short. All Rights Reserved. Arodi
 Emmanuel
*/
import { createContext, type Context } from 'react'
import type { I18nState } from './types'

export const I18nCtx: Context<I18nState | null> =
  createContext<I18nState | null>(null)
