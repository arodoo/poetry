/*
 * File: useZonesMutations.ts
 * Purpose: React Query mutation hooks for zones feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'
import { createZone, updateZone, deleteZone } from '../api/zonesApi'
import type {
  CreateZoneInput,
  UpdateZoneInput,
  ZoneDetail,
} from '../model/ZonesSchemas'
import { useZonesMutationSuccess } from './useZonesMutationHelpers'
import { zonesQueryKeys } from './useZonesQueries'

export function useCreateZoneMutation(): UseMutationResult<
  ZoneDetail,
  unknown,
  CreateZoneInput
> {
  const onSuccess: (detail: ZoneDetail) => void =
    useZonesMutationSuccess()
  return useMutation({
    mutationFn: createZone,
    onSuccess,
  })
}

export function useUpdateZoneMutation(): UseMutationResult<
  ZoneDetail,
  unknown,
  { id: string; input: UpdateZoneInput; etag?: string }
> {
  const onSuccess: (detail: ZoneDetail) => void =
    useZonesMutationSuccess()
  return useMutation({
    mutationFn: ({ id, input, etag }) => updateZone(id, input, etag),
    onSuccess,
  })
}

export function useDeleteZoneMutation(): UseMutationResult<
  void,
  unknown,
  { id: string; version: number; etag?: string }
> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, version, etag }) => deleteZone(id, version, etag),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: zonesQueryKeys.root })
    },
  })
}
