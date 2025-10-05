/*
 * File: PageInfo.tsx
 * Purpose: Display current pagination range info.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../../shared/i18n/useT'

interface Props {
  readonly start: number
  readonly end: number
  readonly total: number
}

export function PageInfo(props: Props): ReactElement {
  const t = useT()
  return (
    <div className="text-sm text-content-secondary">
      {t('ui.table.pagination.showing')} {props.start}-{props.end}{' '}
      {t('ui.table.pagination.of')} {props.total}
    </div>
  )
}
