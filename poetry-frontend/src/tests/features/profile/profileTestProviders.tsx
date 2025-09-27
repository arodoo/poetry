/*
 * File: profileTestProviders.tsx
 * Purpose: Supply rendering helpers for profile feature tests.
 * All Rights Reserved. Arodi Emmanuel
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { I18nCtx } from '../../../shared/i18n/context'
import { ToastCtx } from '../../../shared/toast/toastContext'

const noopPush: (message: string) => void = (message: string): void => {
  void message
}

export function withProfileProviders(
  ui: ReactElement,
  push: (message: string) => void = noopPush
): ReactElement {
  const client: QueryClient = new QueryClient()
  return (
    <I18nCtx.Provider
      value={{
        locale: 'en',
        messages: {},
        t: (key: string): string => key,
        setLocale: (nextLocale: string): void => {
          void nextLocale
        },
      }}
    >
      <QueryClientProvider client={client}>
        <ToastCtx.Provider value={{ push }}>{ui}</ToastCtx.Provider>
      </QueryClientProvider>
    </I18nCtx.Provider>
  )
}
