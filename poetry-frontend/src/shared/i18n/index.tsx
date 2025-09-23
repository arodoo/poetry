/*
 File: index.tsx
 Purpose: Clean i18n provider using dedicated services and hooks for locale
 management. The provider centralizes message resolution, locale switching and
 strict missing key handling for safety. It is designed to be minimal, testable
 and suitable for production use in the frontend.
 All Rights Reserved. Arodi Emmanuel
*/
import { useMemo, type ReactNode, type ReactElement } from 'react'
import { I18nCtx } from './context'
import { esCatalog } from './catalog/es'
import { enCatalog } from './catalog/en'
import { useLocale } from './hooks/useLocale'
import { localeService } from './services/localeService'
import type { I18nKey } from './generated/keys'

export type Messages = Record<string, string>

export type I18nState = Readonly<{
  locale: string
  messages: Messages
  t: (k: I18nKey, vars?: Record<string, unknown>) => string
  setLocale: (l: string) => void
}>

function format(tpl: string, vars?: Record<string, unknown>): string {
  if (!vars) return tpl
  return tpl.replace(/{{(.*?)}}/g, (_: string, k: string): string => {
    const key: string = k.trim()
    const value: unknown = vars[key]
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value)
    } else {
      return ''
    }
  })
}

const catalogs: Record<string, Messages> = { es: esCatalog, en: enCatalog }

function ensureMessages(loc: string, fallback: string): Messages {
  return catalogs[loc] ?? catalogs[fallback] ?? {}
}

export function I18nProvider(props: { children: ReactNode }): ReactElement {
  const { locale, setLocale } = useLocale()

  const value: I18nState = useMemo((): I18nState => {
    const messages: Messages = ensureMessages(
      locale,
      localeService.getDefaultLocale()
    )
    const typedMessages: Record<string, string> = messages as Record<
      string,
      string
    >
    const t: (k: string, vars?: Record<string, unknown>) => string = (
      k: string,
      vars?: Record<string, unknown>
    ): string => {
      const msg: string | undefined = typedMessages[k]
      if (msg === undefined) throw new Error(`i18n.missing:${k}`)
      return format(msg, vars)
    }
    return { locale, messages, t, setLocale }
  }, [locale, setLocale])

  return <I18nCtx.Provider value={value}>{props.children}</I18nCtx.Provider>
}
