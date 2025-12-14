/*
 * File: MaintenanceCard.tsx
 * Purpose: Card with maintenance controls (clear all templates)
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Button } from '../../../ui/Button/Button'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'

interface MaintenanceCardProps {
    loading: boolean
    onClear: () => void
}

export function MaintenanceCard({ loading, onClear }: MaintenanceCardProps): ReactElement {
    const t = useT()

    return (
        <Card>
            <div className="p-4 space-y-3">
                <Text size="lg" weight="bold">⚙️ Maintenance</Text>
                <Text size="sm" className="text-[var(--color-text-muted)]">
                    Dangerous operations - use with caution
                </Text>
                <Button onClick={onClear} variant="danger" size="sm" disabled={loading}>
                    {t('ui.devtools.hardware.clearAll')}
                </Button>
            </div>
        </Card>
    )
}
