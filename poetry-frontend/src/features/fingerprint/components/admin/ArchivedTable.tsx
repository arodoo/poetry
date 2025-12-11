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

interface Props {
  data: FingerprintResponse[]
  mutation: UseMutationResult<FingerprintResponse, Error, number>
}

export function ArchivedTable({ data, mutation }: Props): ReactElement {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <Th>ID</Th>
            <Th>User ID</Th>
            <Th>Archived At</Th>
            <Th>Action</Th>
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
  return (
    <tr className="border-b border-[var(--color-border)]">
      <td className="p-2 text-[var(--color-text)]">{fp.id}</td>
      <td className="p-2 text-[var(--color-text)]">{fp.userId}</td>
      <td className="p-2 text-[var(--color-text)]">{fp.archivedAt ?? '-'}</td>
      <td className="p-2">
        <Button size="sm" onClick={onRestore} disabled={restoring}>
          {restoring ? 'Restoring...' : 'Restore'}
        </Button>
      </td>
    </tr>
  )
}
