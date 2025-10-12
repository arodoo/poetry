
/*
 * File: ZonesListShell.tsx
 * Purpose: Container component for displaying a list of zones with table structure, pagination, and state handling. Manages loading, error, and empty states, and provides user interaction flows for zone management. Designed for modularity and integration with admin features.
 * All Rights Reserved. Arodi Emmanuel
 */

import { Link } from 'react-router-dom'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import type { ZoneResponse } from '../model/ZonesSchemas'
import { useT } from '../../../shared/i18n/useT'

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
}: ZonesListShellProps) {
  const t = useT()

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="text-content-secondary">
          {t('list.loading')}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          to={`/${locale}/zones/new`}
          className="btn btn-primary"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
          {t('list.actions.create')}
        </Link>
      </div>

      {zones.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-content-secondary">
            {t('list.empty')}
          </p>
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
                  <td className="px-6 py-4 text-sm">
                    {zone.name}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {zone.description || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {zone.managerId}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <Link
                      to={`/${locale}/zones/edit/${zone.id}`}
                      className="text-action-primary hover:text-action-hover"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => zone.id && onDelete(zone.id)}
                      className="ml-4 text-feedback-error"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
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
