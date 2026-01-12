/*
 * File: DiagnosticsCard.tsx
 * Purpose: Card with sensor diagnostic controls for hardware testing.
 * Provides buttons to scan slots and check available capacity.
 * Displays template count and available slot statistics.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Card } from '../../../../ui/Card/Card'
import { Button } from '../../../../ui/Button/Button'
import { Text } from '../../../../ui/Text/Text'
import { useT } from '../../../../shared/i18n/useT'

interface DiagnosticsCardProps {
    state: {
        sensor: { loading: boolean; count: number; availableSlots: number[]; capacity: number }
        fetchUsedSlots: () => Promise<void>
        fetchAvailableSlots: () => Promise<void>
    }
}

export function DiagnosticsCard({ state }: DiagnosticsCardProps): ReactElement {
    const t = useT()
    const { sensor, fetchUsedSlots, fetchAvailableSlots } = state

    return (
        <Card>
            <div className="p-4 space-y-3">
                <Text size="lg" weight="bold">🔍 Sensor Diagnostics</Text>
                <div className="flex gap-2 flex-wrap">
                    <Button onClick={() => void fetchUsedSlots()} disabled={sensor.loading} size="sm">
                        {t('ui.devtools.hardware.scanSlots')}
                    </Button>
                    <Button onClick={() => void fetchAvailableSlots()} variant="secondary" size="sm" disabled={sensor.loading}>
                        {t('ui.devtools.hardware.availableSlots')}
                    </Button>
                </div>
                <div className="text-sm space-y-1">
                    <Text size="sm">Templates: <strong>{sensor.count}</strong></Text>
                    {sensor.capacity > 0 && (
                        <Text size="sm">Available: <strong>{sensor.availableSlots.length} / {sensor.capacity}</strong></Text>
                    )}
                </div>
            </div>
        </Card>
    )
}
