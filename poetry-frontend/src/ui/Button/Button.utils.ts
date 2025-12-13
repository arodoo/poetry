/* File: Button.utils.ts
 Purpose: Helpers for Button component: base classes, size map
 and className builder. Keeps the heavy composition out of the
 main component file to satisfy CI line limits. This file
 centralizes class composition so the main component stays
 small. All Rights Reserved. Arodi Emmanuel
*/
import type { ButtonProps, TextTone, ButtonWidth } from './Button.types'
import clsx from 'clsx'

export const base: string =
  'inline-flex items-center justify-center font-medium rounded ' +
  'appearance-none select-none focus:outline-none focus:ring ' +
  'focus:ring-[var(--focus-ring-color)] focus:ring-offset-1 ' +
  'focus:ring-[length:var(--focus-ring-width)]'

export const sizeClasses: Record<'sm' | 'md', string> = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-2',
}

export const widthClasses: Record<ButtonWidth, string> = {
  content: 'w-auto',
  container: 'w-full',
  'fixed-small': 'w-20',
  'fixed-medium': 'w-24',
  'fixed-large': 'w-32',
}

export function pickTextColor(
  variant: 'primary' | 'secondary' | 'danger',
  tone: TextTone
): string {
  if (variant === 'primary') return 'text-onPrimary'
  if (variant === 'danger') return 'text-onPrimary'
  // Secondary variant uses tone to determine text color.
  if (tone === 'primary') return 'text-primary'
  if (tone === 'error') return 'text-error'
  if (tone === 'muted') return 'text-textMuted'
  return 'text-text'
}

export function buildClassName(props: ButtonProps): string {
  const p: ButtonProps = props
  const variant: 'primary' | 'secondary' | 'danger' = p.variant ?? 'primary'
  const size: 'sm' | 'md' = p.size ?? 'md'
  const textTone: TextTone = p.textTone ?? 'default'
  const width: ButtonWidth = p.width ?? 'content'
  const classNameProp: string | undefined = (
    p as unknown as { className?: string }
  ).className
  let bg: string
  if (variant === 'primary') {
    bg = 'bg-primary hover:opacity-90'
  } else if (variant === 'danger') {
    bg = 'bg-error hover:opacity-90'
  } else {
    bg = 'bg-background hover:bg-border'
  }
  const border: string | undefined =
    variant === 'secondary' ? 'border border-border' : undefined
  return clsx(
    base,
    bg,
    border,
    pickTextColor(variant, textTone),
    sizeClasses[size],
    widthClasses[width],
    classNameProp
  )
}
