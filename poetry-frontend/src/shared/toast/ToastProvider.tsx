/*
 * File: ToastProvider.tsx
 * Purpose: Minimal toast provider used by public auth flows to display
 *          transient success messages. Designed to be lightweight and easy
 *          to test. Uses existing `Alert` UI for rendering messages.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { Alert } from '../../ui/Alert/Alert'
import { ToastCtx } from './toastContext'

interface Toast {
  id: string
  message: string
}

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider(props: ToastProviderProps): React.ReactElement {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push: (message: string) => void = useCallback(
    (message: string): void => {
      const id: string = Math.random().toString(36).slice(2)
      setToasts((t: Toast[]): Toast[] => [...t, { id, message }])
      setTimeout((): void => {
        setToasts((t: Toast[]): Toast[] =>
          t.filter((x: Toast): boolean => x.id !== id)
        )
      }, 4000)
    },
    []
  )

  return (
    <ToastCtx.Provider value={{ push }}>
      {props.children}
      <div style={{ position: 'fixed', right: 16, top: 16, zIndex: 9999 }}>
        {toasts.map(
          (toastItem: Toast): React.ReactElement => (
            <div key={toastItem.id} style={{ marginBottom: 8 }}>
              <Alert status="success">{toastItem.message}</Alert>
            </div>
          )
        )}
      </div>
    </ToastCtx.Provider>
  )
}
