/*
 * File: ArchivedFingerprintsList.tsx
 * Purpose: Table showing archived fingerprints with restore action.
 * Displays user ID, archived date, and restore button per row.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useArchivedFingerprintsQuery } from '../hooks/useFingerprintAdminQueries'
import { useRestoreFingerprintMutation } from '../hooks/useFingerprintAdminMutations'
import type { FingerprintResponse } from '../model/FingerprintSchemas'
import './ArchivedFingerprintsList.css'

export function ArchivedFingerprintsList() {
  const { data, isLoading, error } = useArchivedFingerprintsQuery()
  const restoreMutation = useRestoreFingerprintMutation()

  if (isLoading) {
    return <div className="archived-loading">Loading archived...</div>
  }

  if (error) {
    return <div className="archived-error">Failed to load archived</div>
  }

  if (!data || data.length === 0) {
    return <div className="archived-empty">No archived fingerprints</div>
  }

  return (
    <div className="archived-list">
      <h3 className="archived-title">Archived Fingerprints</h3>
      <table className="archived-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Archived At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fp) => (
            <ArchivedRow
              key={fp.id}
              fingerprint={fp}
              onRestore={() => fp.id && restoreMutation.mutate(fp.id)}
              isRestoring={restoreMutation.isPending}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface ArchivedRowProps {
  fingerprint: FingerprintResponse
  onRestore: () => void
  isRestoring: boolean
}

function ArchivedRow({ fingerprint, onRestore, isRestoring }: ArchivedRowProps) {
  return (
    <tr>
      <td>{fingerprint.id}</td>
      <td>{fingerprint.userId}</td>
      <td>{fingerprint.archivedAt ?? '-'}</td>
      <td>
        <button
          className="restore-btn"
          onClick={onRestore}
          disabled={isRestoring}
        >
          {isRestoring ? 'Restoring...' : 'Restore'}
        </button>
      </td>
    </tr>
  )
}
