/*
 File: types.ts
 Purpose: shared i18n types used by the i18n provider and tests.
 All Rights Reserved. Arodi Emmanuel
*/
import type { I18nKey } from './generated/keys'

export type Messages = Record<string, string>

export type I18nState = Readonly<{
  locale: string
  messages: Messages
  t: (k: I18nKey, vars?: Record<string, unknown>) => string
  setLocale: (l: string) => void
}>
