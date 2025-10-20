/*
 * File: TokensErrorWrapper.tsx
 * Purpose: Presentational wrapper that provides layout styles for the
 * tokens error view, keeping the main view file under the max-lines limit.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'

interface Props {
  children: ReactElement
}

export default function TokensErrorWrapper({ children }: Props): ReactElement {
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
      {children}
    </div>
  )
}
