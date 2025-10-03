/*
 File: main.tsx
 Purpose: Application entry point. Initializes configuration validation
 and renders the root App component. The environment validator is
 imported for side-effects to fail fast on invalid settings.
 All Rights Reserved. Arodi Emmanuel
*/
import { StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import './index.css'
import App from './App'
import { I18nProvider } from './shared/i18n'
import { TokensProvider } from './shared/tokens/TokensProvider'
import { ErrorBoundary } from './shared/error/ErrorBoundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getEnv } from './shared/config/env'
import './shared/polyfills/responseStatusProperty'

// Dev-only: install client error bridge BEFORE any code that may throw
if (import.meta.env.DEV) {
  // Ensure dev-only modules are loaded; use void to mark intentionally un-awaited promises
  void import('./shared/dev/clientErrorReporter')
  // Set up CSS variables health check monitor
  void import('./shared/dev/cssVariablesHealthCheck').then(
    (module: { setupCssVariablesMonitor: () => void }): void => {
      module.setupCssVariablesMonitor()
    }
  )
}

// Fail-fast: validate env at startup (bridge errors explicitly in dev)
if (import.meta.env.DEV) {
  try {
    getEnv()
  } catch (e: unknown) {
    const err: Error = e instanceof Error ? e : new Error(String(e))
    const body: string = JSON.stringify({
      type: 'startup-throw',
      name: err.name,
      message: err.message,
      stack: err.stack,
    })
    try {
      navigator.sendBeacon(
        '/__client-errors',
        new Blob([body], { type: 'application/json' })
      )
    } catch {
      void fetch('/__client-errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch((): void => {
        /* noop */
      })
    }
    throw e
  }
} else {
  getEnv()
}

const rootElement: HTMLElement | null = document.getElementById('root')

if (rootElement !== null) {
  const root: Root = createRoot(rootElement)
  const queryClient: QueryClient = new QueryClient()
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <I18nProvider>
            <TokensProvider>
              <App />
            </TokensProvider>
          </I18nProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </StrictMode>
  )
}
