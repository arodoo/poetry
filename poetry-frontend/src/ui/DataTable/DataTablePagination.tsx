/*
 * File: DataTablePagination.tsx
 * Purpose: Pagination controls for DataTable component.
 * Handles page navigation, size selection, and info display.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { PageInfo } from './PageInfo'
import { PageControls } from './PageControls'

export interface PaginationProps {
  readonly currentPage: number
  readonly pageSize: number
  readonly totalElements: number
  readonly totalPages: number
  readonly onPageChange: (page: number) => void
  readonly onPageSizeChange: (size: number) => void
}

export function DataTablePagination(props: PaginationProps): ReactElement {
  const start = props.currentPage * props.pageSize + 1
  const end = Math.min(
    (props.currentPage + 1) * props.pageSize,
    props.totalElements
  )
  const hasPrev = props.currentPage > 0
  const hasNext = props.currentPage < props.totalPages - 1

  return (
    <div className="px-6 py-3 bg-surface-base border-t">
      <div className="flex justify-between items-center">
        <PageInfo start={start} end={end} total={props.totalElements} />
        <PageControls
          currentPage={props.currentPage}
          pageSize={props.pageSize}
          hasPrev={hasPrev}
          hasNext={hasNext}
          onPageChange={props.onPageChange}
          onPageSizeChange={props.onPageSizeChange}
        />
      </div>
    </div>
  )
}
