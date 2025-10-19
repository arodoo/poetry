/*
 * File: TokensErrorView.tsx
 * Purpose: Extracted visible error UI for token loading failures to keep
 * TokensProvider concise and focused on data fetching and side-effects.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import TokensErrorDetails from './TokensErrorDetails'

interface Props {
  errorMessage: string
}

export default function TokensErrorView({ errorMessage }: Props): ReactElement {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--color-surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          backgroundColor: 'var(--color-onSurface, white)',
          border: '3px solid var(--color-error)',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: 'var(--shadow)',
        }}
      >
        <h1 style={{ color: 'var(--color-error)', marginTop: 0, fontSize: '24px' }}>
          🚨 Design Tokens Failed to Load
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
          The application cannot render properly without design system tokens.
          This is a critical error that must be fixed.
        </p>
        <div
          style={{
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--color-error)',
            borderRadius: '4px',
            padding: '12px',
            marginTop: '16px',
            fontFamily: 'monospace',
            fontSize: '14px',
            overflowX: 'auto',
          }}
        >
          <strong>Error:</strong> {errorMessage}
        </div>
        <TokensErrorDetails />
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
