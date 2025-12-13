/*
 * File: SyncIssues.tsx
 * Purpose: Display synchronization issues between hardware and database.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Text } from '../../../ui/Text/Text'
import { Badge } from '../../../ui/Badge/Badge'

interface SyncIssuesProps {
  orphanedInSensor: number[]
  missingInSensor: number[]
}

export function SyncIssues({
  orphanedInSensor,
  missingInSensor,
}: SyncIssuesProps): ReactElement | null {
  const hasIssues = orphanedInSensor.length > 0 || missingInSensor.length > 0

  if (!hasIssues) {
    return (
      <Card>
        <div className="p-6 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500">
          <Text size="md" weight="bold" className="text-green-800 dark:text-green-200">
            ✓ Hardware and Database are in sync
          </Text>
          <Text size="sm" className="text-green-700 dark:text-green-300 mt-1">
            All fingerprints match between sensor and database
          </Text>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 space-y-4">
        <div>
          <Text size="md" weight="bold" className="text-yellow-800 dark:text-yellow-200">
            ⚠ Sync Issues Detected
          </Text>
          <Text size="sm" className="text-yellow-700 dark:text-yellow-300 mt-1">
            Discrepancies found between hardware sensor and database
          </Text>
        </div>

        {orphanedInSensor.length > 0 && (
          <div className="space-y-2">
            <Text size="sm" weight="bold" className="text-yellow-900 dark:text-yellow-100">
              Orphaned in Sensor ({orphanedInSensor.length})
            </Text>
            <Text size="sm" className="text-yellow-800 dark:text-yellow-200 mb-2">
              These slots exist in hardware but not in database:
            </Text>
            <div className="flex flex-wrap gap-2">
              {orphanedInSensor.map((slot) => (
                <Badge key={slot} tone="neutral" size="md">
                  Slot {slot}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {missingInSensor.length > 0 && (
          <div className="space-y-2">
            <Text size="sm" weight="bold" className="text-yellow-900 dark:text-yellow-100">
              Missing in Sensor ({missingInSensor.length})
            </Text>
            <Text size="sm" className="text-yellow-800 dark:text-yellow-200 mb-2">
              These slots exist in database but not in hardware:
            </Text>
            <div className="flex flex-wrap gap-2">
              {missingInSensor.map((slot) => (
                <Badge key={slot} tone="danger" size="md">
                  Slot {slot}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
