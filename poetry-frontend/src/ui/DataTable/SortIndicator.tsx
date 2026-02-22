/*
 * File: SortIndicator.tsx
 * Purpose: Visual sort direction indicator for DataTable
 * column headers. Renders ascending, descending, or neutral
 * arrow icons inline with the column header text.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { SortDirection } from './SortTypes'

interface Props {
  readonly direction: SortDirection
}

const NEUTRAL = '⬍'
const ASC_ARROW = '▲'
const DESC_ARROW = '▼'

export function SortIndicator(props: Props): ReactElement {
  const icon =
    props.direction === 'asc'
      ? ASC_ARROW
      : props.direction === 'desc'
        ? DESC_ARROW
        : NEUTRAL

  const activeCls =
    props.direction !== null
      ? 'text-[var(--color-primary,#6366f1)]'
      : 'text-[var(--color-muted,#6b7280)] opacity-40'

  return (
    <span
      className={'ml-1 text-[0.65rem] inline-block ' + activeCls}
      aria-hidden="true"
    >
      {icon}
    </span>
  )
}
