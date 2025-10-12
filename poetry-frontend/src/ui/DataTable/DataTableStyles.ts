/*
 * File: DataTableStyles.ts
 * Purpose: Extracted Tailwind CSS class constants for DataTable.
 * Provides reusable style definitions to maintain file limits.
 * All Rights Reserved. Arodi Emmanuel
 */

export const s: {
  readonly w: string
  readonly sc: string
  readonly al: string
  readonly b: string
  readonly bD: string
  readonly t: string
  readonly th: string
  readonly thC: string
  readonly thCol: string
  readonly tb: string
  readonly tbD: string
  readonly tr: string
  readonly td: string
  readonly tdCol: string
  readonly em: string
} = {
  w: 'w-full',
  sc: 'overflow-x-auto',
  al: 'inline-block min-w-full align-middle',
  b: 'rounded-lg border ' + 'border-[var(--color-border,#d0d0d0)]',
  bD: '',
  t: 'min-w-full divide-y divide-[var(--color-border,#d0d0d0)]',
  th: 'bg-[var(--color-surface,#ffffff)]',
  thC: 'px-6 py-3 text-left text-xs font-medium uppercase',
  thCol: 'tracking-wider text-[var(--color-muted,#6b7280)]',
  tb:
    'divide-y divide-[var(--color-border,#d0d0d0)] ' +
    'bg-[var(--color-surface,#ffffff)]',
  tbD: '',
  tr: 'hover:bg-[var(--color-background,#f5f5f5)]',
  td: 'whitespace-nowrap px-6 py-4 text-sm',
  tdCol: 'text-[var(--color-text,#1a1a1a)]',
  em: 'px-6 py-10 text-center text-sm ' + 'text-[var(--color-muted,#6b7280)]',
} as const
