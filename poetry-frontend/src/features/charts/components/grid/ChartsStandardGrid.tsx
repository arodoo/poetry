/*
 * File: ChartsStandardGrid.tsx
 * Purpose: Renders secondary chart tile groups.
 * It keeps the main grid component small.
 * Group files own the metric-specific chart lists.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { ChartsBusinessGrid } from './ChartsBusinessGrid'
import type {
  ChartsGridDataProps,
} from './ChartsGridDataProps'
import { ChartsPeopleGrid } from './ChartsPeopleGrid'

export function ChartsStandardGrid(
  props: ChartsGridDataProps
): ReactElement {
  return (
    <>
      <ChartsPeopleGrid data={props.data} />
      <ChartsBusinessGrid data={props.data} />
    </>
  )
}