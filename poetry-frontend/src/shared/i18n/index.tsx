/*
 File: index.tsx
 Purpose: Minimal i18n provider scaffold. Supplies a translate function
 and current locale via React context. Messages are simple key-value
 maps. Full locale-prefixed routing and complete translations are
 handled in Task 19. All Rights Reserved. Arodi Emmanuel
*/
import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
  type ReactElement,
} from 'react'

export type Messages = Record<string, string>

export type I18nState = Readonly<{
  locale: string
  messages: Messages
}>

const I18nCtx = createContext<I18nState | null>(null)

export function I18nProvider(props: {
  children: ReactNode
  locale?: string
  messages?: Messages
}): ReactElement {
  const value = useMemo<I18nState>(() => {
    return {
      locale: props.locale ?? 'en',
      messages: props.messages ?? { hello: 'Hello' },
    }
  }, [props.locale, props.messages])

  return <I18nCtx.Provider value={value}>{props.children}</I18nCtx.Provider>
}

export function useT(): (key: string) => string {
  const ctx = useContext(I18nCtx)
  return (key: string): string => {
    if (!ctx) return key
    return ctx.messages[key] ?? key
  }
}
