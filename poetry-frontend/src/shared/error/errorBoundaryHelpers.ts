/*
 File: errorBoundaryHelpers.ts
 Purpose: Helper to build the title, message and details used by ErrorBoundary.
 This keeps the UI logic small and reusable while preserving original behaviour.
 All Rights Reserved. Arodi Emmanuel
*/
import type { ErrorInfo } from 'react'

export function buildErrorDisplay(
  error: Error,
  errorInfo?: ErrorInfo | null
): {
  title: string
  message: string
  details: string | undefined
} {
  const isDev: boolean = import.meta.env.DEV
  const title: string = isDev ? '🐛 React Error' : '⚠️ Something went wrong'
  const message: string = isDev
    ? 'A React component error occurred. Check the details below.'
    : 'We encountered an unexpected error. Please try refreshing the page.'
  const details: string | undefined = isDev
    ? [
        `Error: ${error.message}`,
        '',
        'Stack:',
        error.stack ?? 'n/a',
        '',
        'ComponentStack:',
        errorInfo?.componentStack ?? 'n/a',
      ].join('\n')
    : undefined

  return { title, message, details }
}
