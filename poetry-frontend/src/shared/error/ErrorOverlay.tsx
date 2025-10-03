/*
 File: ErrorOverlay.tsx
 Purpose: Presentational component that renders a styled error overlay used
 by the ErrorBoundary to show error information without inflating the
 boundary implementation. Keeps ErrorBoundary small and testable.
 All Rights Reserved. Arodi Emmanuel
*/
import type { ReactNode } from 'react'

export default function ErrorOverlay({
  title,
  message,
  details,
  onReload,
}: {
  title: string
  message: string
  details?: ReactNode
  onReload: () => void
}): ReactNode {
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
        overflow: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          backgroundColor: 'var(--color-onSurface, white)',
          border: '3px solid var(--color-error)',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: 'var(--shadow)',
        }}
      >
        <h1 style={{ color: 'var(--color-error)', marginTop: 0, fontSize: '24px' }}>
          {title}
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>{message}</p>
        {details}
        <button
          onClick={onReload}
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
