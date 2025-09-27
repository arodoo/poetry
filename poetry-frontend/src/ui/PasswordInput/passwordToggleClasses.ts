/*
 * File: passwordToggleClasses.ts
 * Purpose: Provide class name helpers for the password toggle button to
 * keep the component lean.
 * All Rights Reserved. Arodi Emmanuel
 */
import clsx from 'clsx'

const containerClassList: readonly string[] = [
  'group',
  'absolute',
  'inset-y-0',
  'right-0',
  'flex',
  'items-center',
  'justify-center',
]

const focusClassList: readonly string[] = [
  'text-[var(--color-text-muted,#666)]',
  'focus:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-[var(--focus-ring-color)]',
  'rounded',
  'transition-colors',
]

const baseToggleClasses: string = [
  ...containerClassList,
  ...focusClassList,
].join(' ')

const paddingBySize: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'px-1',
  md: 'px-2',
  lg: 'px-3',
}

export function buildToggleClasses(
  fieldSize: 'sm' | 'md' | 'lg',
  extraClassName: string
): string {
  return clsx(baseToggleClasses, paddingBySize[fieldSize], extraClassName)
}
