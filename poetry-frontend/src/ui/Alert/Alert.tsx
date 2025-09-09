/*
 File: Alert.tsx
 Purpose: Simple token-driven alert box supporting status variants.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type HTMLAttributes } from 'react'
import clsx from 'clsx'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  status?: 'info' | 'warning' | 'error' | 'success'
}

export function Alert(props: AlertProps): ReactElement {
  const { status = 'info', className, ...rest } = props
  const base: string = 'rounded px-3 py-2 text-sm'
  const map: Record<string, string> = {
    info:
      'bg-[var(--color-background,#eef2ff)] ' +
      'text-[var(--color-text,#1a1a1a)]',
    warning: 'bg-yellow-100 text-yellow-900',
    error: 'bg-red-100 text-red-900',
    success: 'bg-green-100 text-green-900',
  }

  return <div className={clsx(base, map[status], className)} {...rest} />
}
