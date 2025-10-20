/*
 * File: ZonesListShell.tsx
 * Purpose: Container component for displaying a list of zones with table structure, pagination, and state handling. Manages loading, error, and empty states, and provides user interaction flows for zone management. Designed for modularity and integration with admin features.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import type { ZoneResponse } from '../model/ZonesSchemas'
import { useT } from '../../../shared/i18n/useT'
import { ZonesListTopActions } from './ZonesListTopActions'
import { ZoneRowActions } from './ZoneRowActions'

interface ZonesListShellProps {
  readonly zones: readonly ZoneResponse[]
  readonly isLoading: boolean
  readonly onDelete: (zoneId: number) => void
  readonly locale: string
}

export function ZonesListShell({
  zones,
  isLoading,
  onDelete,
  locale,
}: ZonesListShellProps): ReactElement {
  const t = useT()

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="text-content-secondary">{t('list.loading')}</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <ZonesListTopActions locale={locale} t={t} />

      {zones.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-content-secondary">{t('list.empty')}</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-surface-elevated">
          <table className="min-w-full divide-y divide-border-subtle">
            <thead className="bg-surface-sunken">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  {t('list.columns.name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  {t('list.columns.description')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  {t('list.columns.manager')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium">
                  {t('list.columns.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {zones.map((zone) => (
                <tr key={zone.id}>
                  <td className="px-6 py-4 text-sm">{zone.name}</td>
                  <td className="px-6 py-4 text-sm">
                    {zone.description ?? '-'}
                  </td>
                  <td className="px-6 py-4 text-sm">{zone.managerId}</td>
                  <td className="px-6 py-4 text-sm text-right">
                    <ZoneRowActions
                      locale={locale}
                      id={zone.id}
                      onDelete={onDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
