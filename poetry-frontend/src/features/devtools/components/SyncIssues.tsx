/*
 * File: SyncIssues.tsx
 * Purpose: Display synchronization issues between hardware and database.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Text } from '../../../ui/Text/Text'
import { Card } from '../../../ui/Card/Card'

interface SyncIssuesProps {
  orphanedInSensor: number[]
  missingInSensor: number[]
}

export function SyncIssues({
  orphanedInSensor,
  missingInSensor,
}: SyncIssuesProps): ReactElement | null {
  if (orphanedInSensor.length === 0 && missingInSensor.length === 0) {
    return null
  }

  return (
    <Card>
      <div className="p-4">
        <Text
          size="sm"
          weight="bold"
          className="mb-2 text-[var(--color-warning)]"
        >
          Sync Issues
        </Text>
        {orphanedInSensor.length > 0 && (
          <Text size="sm">
            Orphaned in sensor: {orphanedInSensor.join(', ')}
          </Text>
        )}
        {missingInSensor.length > 0 && (
          <Text size="sm">Missing in sensor: {missingInSensor.join(', ')}</Text>
        )}
      </div>
    </Card>
  )
}
