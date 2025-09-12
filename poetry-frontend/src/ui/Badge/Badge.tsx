/*
 File: Badge.tsx
 Purpose: Small status/label indicator using theme tokens. It supports tone
 and size variants to adapt to context while staying visually consistent.
 Focus handling follows the UI focus ring tokens for keyboard users.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type HTMLAttributes } from 'react'
import clsx from 'clsx'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'primary' | 'neutral' | 'danger' | 'success'
  size?: 'sm' | 'md'
}

export function Badge({
  tone = 'primary',
  size = 'sm',
  className,
  ...rest
}: BadgeProps): ReactElement {
  const toneMap: Record<string, string> = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-onPrimary,#fff)]',
    neutral: 'bg-[var(--color-surface,#e5e5e5)] text-[var(--color-text,#111)]',
    danger: 'bg-[var(--color-danger,#dc2626)] text-white',
    success: 'bg-[var(--color-success,#16a34a)] text-white',
  }
  const sizeMap: Record<string, string> = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
  }
  return (
    <span
      className={clsx(
        [
          'inline-flex',
          'items-center',
          'rounded',
          'font-medium',
          'tracking-wide',
        ].join(' '),
        [
          'focus:outline-none',
          'focus:ring-[var(--focus-ring-color)]',
          'focus:ring-offset-1',
          'focus:ring-[length:var(--focus-ring-width)]',
        ].join(' '),
        toneMap[tone],
        sizeMap[size],
        className
      )}
      {...rest}
    />
  )
}
