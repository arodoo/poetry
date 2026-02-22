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
  readonly thSort: string
  readonly tb: string
  readonly tbD: string
  readonly tr: string
  readonly td: string
  readonly tdCol: string
  readonly em: string
  readonly toolbar: string
  readonly trBody: string
  readonly trFetching: string
} = {
  w: 'w-full',
  sc: 'overflow-x-auto',
  al: 'inline-block min-w-full align-middle',
  b: 'rounded-lg border ' + 'border-[var(--color-border,#d0d0d0)]',
  bD: '',
  t: 'w-full table-fixed divide-y divide-[var(--color-border,#d0d0d0)]',
  th: 'bg-[var(--color-surface,#ffffff)]',
  thC: 'px-6 py-3 text-left text-xs font-medium uppercase overflow-hidden',
  thCol: 'tracking-wider text-[var(--color-muted,#6b7280)] truncate',
  thSort:
    'cursor-pointer select-none transition-colors ' +
    'hover:bg-[var(--color-background,#f5f5f5)]',
  tb:
    'divide-y divide-[var(--color-border,#d0d0d0)] ' +
    'bg-[var(--color-surface,#ffffff)]',
  tbD: '',
  tr: 'hover:bg-[var(--color-background,#f5f5f5)]',
  td: 'whitespace-nowrap px-6 py-4 text-sm overflow-hidden truncate',
  tdCol: 'text-[var(--color-text,#1a1a1a)]',
  em: 'px-6 py-10 text-center text-sm ' + 'text-[var(--color-muted,#6b7280)]',
  toolbar: 'mb-4 flex items-center gap-3 flex-wrap',
  trBody: 'transition-all duration-500 ease-in-out',
  trFetching: 'opacity-40 blur-[1px] pointer-events-none',
} as const

export const widths: Record<string, string> = {
  xs: '70px', // Fixed: ID, small codes
  sm: '100px', // Fixed: Status, Actions
  md: '15%', // Proportional: Dates, short strings
  lg: '25%', // Proportional: Names
  xl: '35%', // Proportional: Long text
  auto: 'auto',
}
