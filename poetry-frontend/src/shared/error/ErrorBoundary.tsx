/*
 File: ErrorBoundary.tsx
 Purpose: React Error Boundary to catch and display component errors
 instead of a white screen. It surfaces detailed error information during
 development and a concise, user-friendly message in production. It
 prevents silent failures and offers a reload action to recover the app.
 All Rights Reserved. Arodi Emmanuel
*/
 
import type { ReactNode, ErrorInfo } from 'react'
import { Component } from 'react'
import ErrorOverlay from './ErrorOverlay'

interface ErrorBoundaryProps {
  readonly children: ReactNode
  readonly fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode
}

interface ErrorBoundaryState {
  readonly hasError: boolean
  readonly error: Error | null
  readonly errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public constructor(props: ErrorBoundaryProps) {
    super(props)
  }

  public static getDerivedStateFromError(
    error: Error
  ): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('🚨 [ErrorBoundary] Caught error:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  public override render(): ReactNode {
    const { hasError, error, errorInfo } = this.state
    const { children, fallback } = this.props

    if (hasError && error) {
      if (fallback && errorInfo) return fallback(error, errorInfo)

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

      return (
        <ErrorOverlay
          title={title}
          message={message}
          details={<pre style={{ fontFamily: 'monospace' }}>{details}</pre>}
          onReload={(): void => { window.location.reload(); }}
        />
      )
    }

    return children
  }
}

export default ErrorBoundary
