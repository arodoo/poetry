/*
 * File: useHardwareDebug.ts
 * Purpose: Hook for hardware debug logic and state management.
 * All Rights Reserved. Arodi Emmanuel
 * Updated: 2025-12-12 - Fixed API endpoints
 */
import { useState } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { useToast } from '../../../shared/toast/toastContext'

interface SensorState {
    count: number
    slots: number[]
    loading: boolean
    error: string | null
}

const HARDWARE_URL = '/hardware'

export function useHardwareDebug(): {
    sensor: SensorState
    fetchUsedSlots: () => Promise<void>
    clearAllTemplates: () => Promise<void>
} {
    const t = useT()
    const toast = useToast()
    const [sensor, setSensor] = useState<SensorState>({
        count: 0,
        slots: [],
        loading: false,
        error: null,
    })

    const fetchUsedSlots = async (): Promise<void> => {
        setSensor((s) => ({ ...s, loading: true, error: null }))
        try {
            const res = await fetch(`${HARDWARE_URL}/api/fingerprint/used-slots`)
            const data = await res.json()
            setSensor({
                count: data.count,
                slots: data.slots,
                loading: false,
                error: null,
            })
            // Success feedback
            if (data.count === 0) {
                toast.push('No fingerprints found in sensor')
            } else {
                toast.push(`Found ${data.count} fingerprint${data.count > 1 ? 's' : ''} in sensor`)
            }
        } catch (e) {
            setSensor((s) => ({ ...s, loading: false, error: String(e) }))
            toast.push('Failed to scan sensor')
        }
    }

    const clearAllTemplates = async (): Promise<void> => {
        setSensor((s) => ({ ...s, loading: true, error: null }))
        try {
            await fetch(`${HARDWARE_URL}/api/fingerprint/clear-all`, { method: 'POST' })
            toast.push(t('ui.devtools.hardware.clearSuccess'))
            await fetchUsedSlots()
        } catch (e) {
            const msg = String(e)
            setSensor((s) => ({ ...s, loading: false, error: msg }))
            toast.push(t('ui.devtools.hardware.clearError'))
        }
    }

    return {
        sensor,
        fetchUsedSlots,
        clearAllTemplates,
    }
}
