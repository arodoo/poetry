/* useHardwareDebug: hook for hardware debug state and actions */
import { useState } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { useToast } from '../../../shared/toast/toastContext'
import * as api from './hardware-api'

import type { SensorState } from './useHardwareDebug.helpers'
import { INITIAL_SENSOR } from './useHardwareDebug.helpers'

export function useHardwareDebug(): {
  sensor: SensorState
  fetchUsedSlots: () => Promise<void>
  fetchAvailableSlots: () => Promise<void>
  clearAllTemplates: () => Promise<void>
  deleteSlot: (slotId: number) => Promise<void>
} {
  const t = useT()
  const toast = useToast()
  const [sensor, setSensor] = useState<SensorState>(INITIAL_SENSOR)

  const fetchUsedSlots = async (): Promise<void> => {
    setSensor((s) => ({ ...s, loading: true, error: null }))
    try {
      const data = await api.fetchUsedSlotsApi()
      setSensor((s) => ({ ...s, ...data, loading: false }))
      toast.push(`Found ${String(data.count)} fingerprint(s)`)
    } catch (e) {
      setSensor((s) => ({ ...s, loading: false, error: String(e) }))
    }
  }

  const fetchAvailableSlots = async (): Promise<void> => {
    setSensor((s) => ({ ...s, loading: true, error: null }))
    try {
      const data = await api.fetchAvailableSlotsApi()
      const slots = data.slots
      const capacity = data.capacity ?? 0
      setSensor((s) => ({
        ...s,
        availableSlots: slots,
        capacity,
        loading: false,
      }))
      toast.push(
        `Found ${String(slots.length)} available (capacity: ${String(capacity)})`
      )
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      setSensor((s) => ({ ...s, loading: false, error: msg }))
      toast.push(t('ui.devtools.verify.fetchError'))
    }
  }

  const clearAllTemplates = async (): Promise<void> => {
    setSensor((s) => ({ ...s, loading: true }))
    try {
      await api.clearAllApi()
      toast.push(t('ui.devtools.hardware.clearSuccess'))
      await fetchUsedSlots()
    } catch {
      setSensor((s) => ({ ...s, loading: false }))
    }
  }

  const deleteSlot = async (slotId: number): Promise<void> => {
    if (await api.deleteSlotApi(slotId)) {
      toast.push(`Deleted slot ${String(slotId)}`)
      await fetchUsedSlots()
    }
  }

  return {
    sensor,
    fetchUsedSlots,
    fetchAvailableSlots,
    clearAllTemplates,
    deleteSlot,
  }
}
