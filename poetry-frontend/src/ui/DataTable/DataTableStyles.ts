/*
 * File: DataTableStyles.ts
 * Purpose: Style constants for DataTable component.
 * All Rights Reserved. Arodi Emmanuel
 */
export const s: Record<string, string> = {
  w: 'overflow-hidden',
  sc: 'overflow-x-auto',
  al: 'inline-block min-w-full align-middle',
  b: 'overflow-hidden rounded-lg border border-neutral-200',
  bD: 'dark:border-neutral-700',
  t: 'min-w-full divide-y divide-neutral-200 dark:divide-neutral-700',
  th: 'bg-neutral-50 dark:bg-neutral-800',
  thC: 'px-6 py-3 text-left text-xs font-medium uppercase',
  thCol: 'tracking-wider text-neutral-500 dark:text-neutral-400',
  tb: 'divide-y divide-neutral-200 bg-white',
  tbD: 'dark:divide-neutral-700 dark:bg-neutral-900',
  tr: 'hover:bg-neutral-50 dark:hover:bg-neutral-800',
  td: 'whitespace-nowrap px-6 py-4 text-sm',
  tdCol: 'text-neutral-900 dark:text-neutral-100',
  em: 'px-6 py-10 text-center text-sm text-neutral-500',
} as const
