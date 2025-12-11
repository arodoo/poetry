/*
 * File: ArchivedTable.tsx
 * Purpose: Table body for archived fingerprints with restore button.
 * Separated from ArchivedFingerprintsList to respect file size limits.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import type { UseMutationResult } from '@tanstack/react-query'
import { Button } from '../../../../ui/Button/Button'
import type { FingerprintResponse } from '../../model/FingerprintSchemas'

import { useT } from '../../../../shared/i18n/useT'

interface Props {
  data: FingerprintResponse[]
  mutation: UseMutationResult<FingerprintResponse, Error, number>
}

export function ArchivedTable({ data, mutation }: Props): ReactElement {
  const t = useT()
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <Th>{t('ui.fingerprints.admin.archived.table.id')}</Th>
            <Th>{t('ui.fingerprints.admin.archived.table.userId')}</Th>
            <Th>{t('ui.fingerprints.admin.archived.table.archivedAt')}</Th>
            <Th>{t('ui.fingerprints.admin.archived.table.action')}</Th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (fp: FingerprintResponse): ReactElement => (
              <Row
                key={fp.id}
                fp={fp}
                onRestore={(): void => {
                  if (fp.id) mutation.mutate(fp.id)
                }}
                restoring={mutation.isPending}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <th className="text-left p-2 text-[var(--color-textMuted)] font-medium">
      {children}
    </th>
  )
}

interface RowProps {
  fp: FingerprintResponse
  onRestore: () => void
  restoring: boolean
}

function Row({ fp, onRestore, restoring }: RowProps): ReactElement {
  const t = useT()
  return (
    <tr className="border-b border-[var(--color-border)]">
      <td className="p-2 text-[var(--color-text)]">{fp.id}</td>
      <td className="p-2 text-[var(--color-text)]">{fp.userId}</td>
      <td className="p-2 text-[var(--color-text)]">{fp.archivedAt ?? '-'}</td>
      <td className="p-2">
        <Button size="sm" onClick={onRestore} disabled={restoring}>
          {restoring
            ? t('ui.fingerprints.admin.archived.restoring')
            : t('ui.fingerprints.admin.archived.restore')}
        </Button>
      </td>
    </tr>
  )
}
