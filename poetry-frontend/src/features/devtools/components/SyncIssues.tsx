/*
 * File: SyncIssues.tsx
 * Purpose: Display synchronization issues between hardware and database.
 * Shows success state when synced or warning when issues detected.
 * Lists orphaned and missing slots with appropriate visual indicators.
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
        <div className="p-6 bg-[var(--color-success)]/10 border-l-4 border-[var(--color-success)]">
          <Text size="md" weight="bold" className="text-[var(--color-success)]">
            ✓ Hardware and Database are in sync
          </Text>
          <Text size="sm" className="text-[var(--color-textMuted)] mt-1">
            All fingerprints match between sensor and database
          </Text>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="p-6 bg-[var(--color-warning)]/10 border-l-4 border-[var(--color-warning)] space-y-4">
        <div>
          <Text size="md" weight="bold" className="text-[var(--color-warning)]">
            ⚠ Sync Issues Detected
          </Text>
          <Text size="sm" className="text-[var(--color-textMuted)] mt-1">
            Discrepancies found between hardware sensor and database
          </Text>
        </div>

        {orphanedInSensor.length > 0 && (
          <div className="space-y-2">
            <Text size="sm" weight="bold" className="text-[var(--color-text)]">
              Orphaned in Sensor ({orphanedInSensor.length})
            </Text>
            <Text size="sm" className="text-[var(--color-textMuted)] mb-2">
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
            <Text size="sm" weight="bold" className="text-[var(--color-text)]">
              Missing in Sensor ({missingInSensor.length})
            </Text>
            <Text size="sm" className="text-[var(--color-textMuted)] mb-2">
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
