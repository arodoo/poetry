/*
 * File: useHardwarePageState.ts
 * Purpose: Combines hardware debug state with database slots logic
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import { useFingerprintsListQuery } from '../../fingerprint/hooks/useFingerprintQueries'
import { useHardwareDebug } from './useHardwareDebug'

export function useHardwarePageState() {
    const { data: dbFingerprints } = useFingerprintsListQuery()
    const hardware = useHardwareDebug()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    const dbSlots = (dbFingerprints ?? [])
        .map((fp) => fp.r503SlotId)
        .filter((s): s is number => s !== undefined && s !== null)

    const orphanedInSensor = hardware.sensor.slots.filter((s) => !dbSlots.includes(s))
    const missingInSensor = dbSlots.filter((s) => !hardware.sensor.slots.includes(s))

    const openConfirm = () => { setIsConfirmOpen(true) }
    const closeConfirm = () => { setIsConfirmOpen(false) }
    const handleClear = async () => {
        closeConfirm()
        await hardware.clearAllTemplates()
    }

    return {
        sensor: hardware.sensor, dbSlots, orphanedInSensor, missingInSensor,
        fetchUsedSlots: hardware.fetchUsedSlots,
        fetchAvailableSlots: hardware.fetchAvailableSlots,
        deleteSlot: hardware.deleteSlot,
        isConfirmOpen, openConfirm, closeConfirm, handleClear
    }
}
