/*
 * File: ChartTile.tsx
 * Purpose: Provides stable sizing for chart panels.
 * It is layout-only so charts stay metric-focused.
 * Wide tiles span the grid for primary analytics.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'

const WIDE_TILE_CLASS = [
  'min-h-[540px]',
  'xl:col-span-2',
].join(' ')
const REGULAR_TILE_CLASS = 'min-h-[430px]'

interface ChartTileProps {
  readonly children: ReactNode
  readonly wide?: boolean
}

export function ChartTile(
  props: ChartTileProps
): ReactElement {
  const className = props.wide
    ? WIDE_TILE_CLASS
    : REGULAR_TILE_CLASS

  return (
    <div className={className}>
      {props.children}
    </div>
  )
}