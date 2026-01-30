/*
 * File: useHardwarePageState.ts
 * Purpose: Combines hardware debug state with database slots logic.
 * Provides unified state for sensor data and DB fingerprint records.
 * Calculates orphaned and missing slots for sync diagnostics.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import type { SensorState } from './useHardwareDebug.helpers'
import { useFingerprintsListQuery } from '../../fingerprint/hooks/useFingerprintQueries'
import { useHardwareDebug } from './useHardwareDebug'

export function useHardwarePageState(): {
  sensor: SensorState
  dbSlots: number[]
  orphanedInSensor: number[]
  missingInSensor: number[]
  fetchUsedSlots: () => Promise<void>
  fetchAvailableSlots: () => Promise<void>
  deleteSlot: (slotId: number) => Promise<void>
  isConfirmOpen: boolean
  openConfirm: () => void
  closeConfirm: () => void
  handleClear: () => Promise<void>
} {
  const { data: dbFingerprints } = useFingerprintsListQuery()
  const hardware = useHardwareDebug()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const dbSlots = (dbFingerprints ?? [])
    .map((fp) => fp.r503SlotId)
    .filter((s): s is number => typeof s === 'number')

  const orphanedInSensor = hardware.sensor.slots.filter(
    (s) => !dbSlots.includes(s)
  )
  const missingInSensor = dbSlots.filter(
    (s) => !hardware.sensor.slots.includes(s)
  )

  const openConfirm = (): void => {
    setIsConfirmOpen(true)
  }
  const closeConfirm = (): void => {
    setIsConfirmOpen(false)
  }
  const handleClear = async (): Promise<void> => {
    closeConfirm()
    await hardware.clearAllTemplates()
  }

  return {
    sensor: hardware.sensor,
    dbSlots,
    orphanedInSensor,
    missingInSensor,
    fetchUsedSlots: hardware.fetchUsedSlots,
    fetchAvailableSlots: hardware.fetchAvailableSlots,
    deleteSlot: hardware.deleteSlot,
    isConfirmOpen,
    openConfirm,
    closeConfirm,
    handleClear,
  }
}
