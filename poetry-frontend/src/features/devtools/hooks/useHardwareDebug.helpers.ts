export interface SensorState {
  count: number
  slots: number[]
  availableSlots: number[]
  capacity: number
  loading: boolean
  error: string | null
}

export const INITIAL_SENSOR: SensorState = {
  count: 0,
  slots: [],
  availableSlots: [],
  capacity: 0,
  loading: false,
  error: null,
}
