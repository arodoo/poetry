/*
 File: Button.tsx
 Purpose: Token-driven button component with minimal variants using CSS vars
 and Tailwind utility classes. Internationalization is delegated to caller.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ButtonHTMLAttributes, type ReactElement } from 'react'
import clsx from 'clsx'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
}

export function Button(props: ButtonProps): ReactElement {
  const { className, variant = 'primary', size = 'md', ...rest } = props
  const base: string =
    'inline-flex items-center font-medium rounded ' +
    'focus:outline-none focus:ring' +
    ' focus:ring-[var(--focus-ring-color)] focus:ring-offset-1 ' +
    'focus:ring-[length:var(--focus-ring-width)]'
  const variantClasses: Record<string, string> = {
    primary:
      'bg-[var(--color-primary)] text-[var(--color-text,#1a1a1a)] ' +
      'hover:opacity-90',
    secondary:
      'bg-[var(--color-background,#f5f5f5)] ' +
      'text-[var(--color-text,#1a1a1a)] ' +
      'border border-[var(--color-border,#d0d0d0)] ' +
      'hover:bg-[var(--color-surface,#ffffff)]',
  }
  const sizeClasses: Record<string, string> = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
  }
  return (
    <button
      className={clsx(
        base,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...rest}
    />
  )
}
