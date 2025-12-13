/*
 * File: useHardwareDebug.ts
 * Purpose: Hook for hardware debug logic and state management.
 * All Rights Reserved. Arodi Emmanuel
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

const HARDWARE_URL = 'http://localhost:3002'

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
            const res = await fetch(`${HARDWARE_URL}/fingerprint/used-slots`)
            const data = await res.json()
            setSensor({
                count: data.count,
                slots: data.slots,
                loading: false,
                error: null,
            })
        } catch (e) {
            setSensor((s) => ({ ...s, loading: false, error: String(e) }))
        }
    }

    const clearAllTemplates = async (): Promise<void> => {
        setSensor((s) => ({ ...s, loading: true, error: null }))
        try {
            await fetch(`${HARDWARE_URL}/fingerprint/clear-all`, { method: 'POST' })
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
