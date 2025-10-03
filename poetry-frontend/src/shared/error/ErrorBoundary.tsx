/*
 File: ErrorBoundary.tsx
 Purpose: React Error Boundary to catch and display component errors
 instead of a white screen. It surfaces detailed error information during
 development and a concise, user-friendly message in production. It
 prevents silent failures and offers a reload action to recover the app.
 All Rights Reserved. Arodi Emmanuel
*/
/* eslint-disable max-lines */
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
      if (fallback && errorInfo) return fallback(error, errorInfo)

      const isDev: boolean = import.meta.env.DEV
      const title = isDev ? '🐛 React Error' : '⚠️ Something went wrong'
      const message = isDev
        ? 'A React component error occurred. Check the details below.'
        : 'We encountered an unexpected error. Please try refreshing the page.'

      const details = isDev ? (
        <div>
          <div style={{ marginTop: 16, fontFamily: 'monospace' }}>
            <strong>Error:</strong> {error.message}
          </div>
          {error.stack && (
            <details style={{ marginTop: 12 }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Stack Trace
              </summary>
              <pre style={{ fontSize: 12, backgroundColor: 'var(--color-background)', padding: 12 }}>
                {error.stack}
              </pre>
            </details>
          )}
          {errorInfo?.componentStack && (
            <details style={{ marginTop: 12 }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Component Stack
              </summary>
              <pre style={{ fontSize: 12, backgroundColor: 'var(--color-background)', padding: 12 }}>
                {errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      ) : undefined

      return <ErrorOverlay title={title} message={message} details={details} onReload={() => window.location.reload()} />
                        backgroundColor: 'var(--color-background)',
                        padding: '12px',
                        borderRadius: '4px',
                        overflow: 'auto',
                        marginTop: '8px',
                      }}
                    >
                      {errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </>
            )}

            <button
              onClick={(): void => {
                window.location.reload()
              }}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: 'var(--color-error)',
                color: 'var(--color-onPrimary, white)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary
