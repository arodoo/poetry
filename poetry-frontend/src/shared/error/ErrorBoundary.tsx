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
import { buildErrorDisplay } from './errorBoundaryHelpers'

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
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
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
      const built: {
        title: string
        message: string
        details: string | undefined
      } = buildErrorDisplay(error, errorInfo)
      return (
        <ErrorOverlay
          title={built.title}
          message={built.message}
          details={
            <pre style={{ fontFamily: 'monospace' }}>{built.details}</pre>
          }
          onReload={(): void => {
            window.location.reload()
          }}
        />
      )
    }
    return children
  }
}

export default ErrorBoundary
