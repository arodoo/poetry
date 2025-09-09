/*
 File: main.tsx
 Purpose: Application entry point. Initializes configuration validation
 and renders the root App component. The environment validator is
 imported for side-effects to fail fast on invalid settings.
 All Rights Reserved. Arodi Emmanuel
*/
import { getEnv } from './shared/config/env'
import { StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import './index.css'
import App from './App'
import { I18nProvider } from './shared/i18n'
import { TokensProvider } from './shared/tokens/TokensProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Fail-fast: validate env at startup
getEnv()

const rootElement: HTMLElement | null = document.getElementById('root')

if (rootElement !== null) {
  const root: Root = createRoot(rootElement)
  const queryClient: QueryClient = new QueryClient()
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <TokensProvider>
            <App />
          </TokensProvider>
        </I18nProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
