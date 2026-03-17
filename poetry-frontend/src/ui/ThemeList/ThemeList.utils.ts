/*
 * File: ThemeList.utils.ts
 * Purpose: CSS class builders for ThemeList component.
 * All Rights Reserved. Arodi Emmanuel
 */

import clsx from 'clsx'

export const container: string = 'mt-md pt-md border-t border-border'

export const title: string = 'font-semibold text-sm text-text mb-md'

export const list: string = 'space-y-sm'

export const item: string =
  'flex items-center justify-between p-sm bg-surface-secondary ' +
  'border border-border rounded-md hover:border-primary/30 transition-colors'

export const itemLeft: string = 'flex items-center gap-md min-w-0'

export const colorSwatch: string = 'flex shrink-0'

export const colorSwatchItem: string =
  'w-5 h-5 rounded-sm border border-border -ml-1 first:ml-0'

export const label: string = 'text-sm font-medium text-text truncate'

export const activeBadge: string =
  'shrink-0 text-xs bg-success/10 text-success px-sm py-0.5 rounded'

export const actions: string = 'flex items-center gap-sm shrink-0'

export const actionButton: string =
  'flex items-center gap-xs text-xs transition-colors'

export const editButton: string = clsx(
  actionButton,
  'text-primary hover:text-primary/80'
)

export const deleteButton: string = clsx(
  actionButton,
  'text-error hover:text-error/80 disabled:opacity-50'
)

export const loadingText: string = 'text-sm text-textMuted mt-md'

export const emptyText: string = 'text-sm text-textMuted'
