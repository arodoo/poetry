/*
 * File: ChartCard.tsx
 * Purpose: Standard card shell for every dashboard chart with consistent
 * border, background, title and optional "View More" footer button.
 * Guarantees uniform theme-aware styling across all charts.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useT } from '../../../../shared/i18n/useT'
import { Button } from '../../../../ui'

interface ChartCardProps {
  title: string
  detailsId?: string
  children: ReactNode
  headerExtras?: ReactNode
}

export function ChartCard({
  title,
  detailsId,
  children,
  headerExtras,
}: ChartCardProps): ReactElement {
  const t = useT()
  const { locale } = useParams()
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        {headerExtras}
      </div>
      <div className="flex flex-1 flex-col min-h-0">{children}</div>
      {detailsId ? (
        <div className="mt-3 flex justify-end">
          <Button
            variant="secondary"
            size="sm"
            onClick={(): void => {
              void navigate(
                `/${locale ?? 'en'}/charts/details/${detailsId}`
              )
            }}
          >
            {t('ui.charts.viewMore')}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
