/*
 File: index.tsx
 Purpose: Minimal i18n provider scaffold. Supplies a translate function
 and current locale via React context. Messages are simple key-value
 maps. Full locale-prefixed routing and complete translations are
 handled in Task 19. All Rights Reserved. Arodi Emmanuel
*/
import { useMemo, type ReactNode, type ReactElement } from 'react'
import { I18nCtx } from './context'

export type Messages = Record<string, string>

export type I18nState = Readonly<{
  locale: string
  messages: Messages
}>

export function I18nProvider(props: {
  children: ReactNode
  locale?: string
  messages?: Messages
}): ReactElement {
  const value: I18nState = useMemo<I18nState>((): I18nState => {
    return {
      locale: props.locale ?? 'en',
      messages: props.messages ?? { hello: 'Hello' },
    }
  }, [props.locale, props.messages])

  return <I18nCtx.Provider value={value}>{props.children}</I18nCtx.Provider>
}
