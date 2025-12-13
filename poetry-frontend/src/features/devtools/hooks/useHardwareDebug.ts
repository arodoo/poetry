/*
 * File: useHardwareDebug.ts
 * Purpose: Hook for hardware debug logic and state management.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { useToast } from '../../../shared/toast/toastContext'
import * as api from './hardware-api'

interface SensorState {
    count: number
    slots: number[]
    availableSlots: number[]
    capacity: number
    loading: boolean
    error: string | null
}

export function useHardwareDebug(): {
    sensor: SensorState
    fetchUsedSlots: () => Promise<void>
    fetchAvailableSlots: () => Promise<void>
    clearAllTemplates: () => Promise<void>
    deleteSlot: (slotId: number) => Promise<void>
} {
    const t = useT()
    const toast = useToast()
    const [sensor, setSensor] = useState<SensorState>({
        count: 0, slots: [], availableSlots: [], capacity: 0, loading: false, error: null,
    })

    const fetchUsedSlots = async (): Promise<void> => {
        setSensor((s) => ({ ...s, loading: true, error: null }))
        try {
            const data = await api.fetchUsedSlotsApi()
            setSensor((s) => ({ ...s, ...data, loading: false }))
            toast.push(`Found ${data.count} fingerprint(s)`)
        } catch (e) {
            setSensor((s) => ({ ...s, loading: false, error: String(e) }))
        }
    }

    const fetchAvailableSlots = async (): Promise<void> => {
        setSensor((s) => ({ ...s, loading: true, error: null }))
        try {
            const data = await api.fetchAvailableSlotsApi()
            const slots = data.slots ?? []
            const capacity = data.capacity ?? 0
            setSensor((s) => ({ ...s, availableSlots: slots, capacity, loading: false }))
            toast.push(`Found ${slots.length} available (capacity: ${capacity})`)
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e)
            setSensor((s) => ({ ...s, loading: false, error: msg }))
            toast.push('Failed to fetch available slots')
        }
    }

    const clearAllTemplates = async (): Promise<void> => {
        setSensor((s) => ({ ...s, loading: true }))
        try {
            await api.clearAllApi()
            toast.push(t('ui.devtools.hardware.clearSuccess'))
            await fetchUsedSlots()
        } catch { setSensor((s) => ({ ...s, loading: false })) }
    }

    const deleteSlot = async (slotId: number): Promise<void> => {
        if (await api.deleteSlotApi(slotId)) {
            toast.push(`Deleted slot ${slotId}`)
            await fetchUsedSlots()
        }
    }

    return { sensor, fetchUsedSlots, fetchAvailableSlots, clearAllTemplates, deleteSlot }
}
