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
    warning: 'bg-[var(--color-warning)] text-[var(--color-onSurface)]',
    error: 'bg-[var(--color-error)] text-white',
    success: 'bg-[var(--color-success)] text-white',
  }

  return <div className={clsx(base, map[status], className)} {...rest} />
}
