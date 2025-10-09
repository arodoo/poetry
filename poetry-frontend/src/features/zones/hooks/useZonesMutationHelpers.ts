/*
 * File: useZonesMutationHelpers.ts
 * Purpose: Shared mutation success handlers for zones.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQueryClient } from '@tanstack/react-query'
import { zonesQueryKeys } from './useZonesQueries'
import type { ZoneDetail } from '../model/ZonesSchemas'

export interface MutationVariables<T> {
  readonly id: string
  readonly input: T
  readonly etag?: string
}

export function useZonesMutationSuccess(): (detail: ZoneDetail) => void {
  const queryClient = useQueryClient()
  return (detail: ZoneDetail): void => {
    void queryClient.invalidateQueries({ queryKey: zonesQueryKeys.root })
    void queryClient.invalidateQueries({
      queryKey: zonesQueryKeys.detail(String(detail.id)),
    })
  }
}
