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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { initEnv } from './shared/bootstrap/initEnv'
import './shared/polyfills/responseStatusProperty'
import { client } from './api/generated/client.gen'
import { tokenStorage } from './shared/security/tokenStorage'
import { startTokenRefreshScheduler } from
  './shared/security/tokenRefreshScheduler'

// Dev-only: install client error bridge synchronously
if (import.meta.env.DEV) {
  import('./shared/dev/clientErrorReporter')
  import('./shared/dev/cssVariablesHealthCheck').then(
    (module: { setupCssVariablesMonitor: () => void }): void => {
      module.setupCssVariablesMonitor()
    }
  )
}

// Fail-fast: validate env at startup (bridge errors explicitly in dev)
initEnv()

// Start background token refresh scheduler to maintain long sessions
startTokenRefreshScheduler()

// Configure authentication for generated SDK client
client.interceptors.request.use((request: Request): Request => {
  const tokens = tokenStorage.load()
  console.log('[SDK Interceptor] Request URL:', request.url)
  console.log('[SDK Interceptor] Tokens:', tokens ? 'LOADED' : 'NONE')
  if (tokens?.accessToken) {
    console.log('[SDK Interceptor] Adding Authorization header')
    request.headers.set('Authorization', `Bearer ${tokens.accessToken}`)
  }
  return request
})

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
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </ErrorBoundary>
    </StrictMode>
  )
}
