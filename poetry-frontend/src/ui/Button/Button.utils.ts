/* File: Button.utils.ts
 Purpose: Helpers for Button component: base classes, size map
 and className builder. Keeps the heavy composition out of the
 main component file to satisfy CI line limits. This file
 centralizes class composition so the main component stays
 small. All Rights Reserved. Arodi Emmanuel
*/
import type { ButtonProps, TextTone } from './Button.types'
import clsx from 'clsx'

export const base: string =
  'inline-flex items-center font-medium rounded appearance-none ' +
  'select-none focus:outline-none focus:ring ' +
  'focus:ring-[var(--focus-ring-color)] focus:ring-offset-1 ' +
  'focus:ring-[length:var(--focus-ring-width)]'

export const sizeClasses: Record<'sm' | 'md', string> = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-2',
}

export function pickTextColor(
  variant: 'primary' | 'secondary' | 'error',
  tone: TextTone
): string {
  if (variant === 'primary') return '!text-[var(--color-onPrimary)]'
  if (variant === 'error') return '!text-[var(--color-onPrimary)]'
  // Secondary variant uses tone to determine text color.
  if (tone === 'primary') return 'text-[var(--color-primary)]'
  if (tone === 'error') return 'text-[var(--color-error)]'
  if (tone === 'muted') return 'text-[var(--color-textMuted)]'
  return 'text-[var(--color-text)]'
}

export function buildClassName(props: ButtonProps): string {
  const p: ButtonProps = props
  const variant: 'primary' | 'secondary' | 'error' = p.variant ?? 'primary'
  const size: 'sm' | 'md' = p.size ?? 'md'
  const textTone: TextTone = p.textTone ?? 'default'
  const width: string | undefined = (p as { width?: string }).width
  const classNameProp: string | undefined = (
    p as unknown as { className?: string }
  ).className
  const bg: string =
    variant === 'primary'
      ? 'bg-[var(--color-primary)] hover:opacity-90'
      : variant === 'error'
        ? 'bg-[var(--color-error)] hover:opacity-90'
        : 'bg-[var(--color-surface)] hover:bg-[var(--color-muted)]'
  const border: string | undefined =
    variant === 'secondary' ? 'border border-transparent' : undefined
  const widthClass: string | undefined =
    width === 'full'
      ? 'w-full'
      : width === 'fixed'
        ? 'w-16 justify-center'
        : undefined
  return clsx(
    base,
    bg,
    border,
    pickTextColor(variant, textTone),
    sizeClasses[size],
    widthClass,
    classNameProp
  )
}
