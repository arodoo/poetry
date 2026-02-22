/*
 * File: useCarouselMutations.ts
 * Purpose: React Query mutation hooks for admin carousel management.
 * Each mutation invalidates the config query on success.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'
import {
  uploadSlide,
  deleteSlide,
  reorderSlides,
  updateInterval,
  uploadOverlay,
  deleteOverlay,
} from '../api/carouselMutations'
import { type CarouselSlide } from '../model/CarouselSchemas'
import { carouselQueryKeys } from './useCarouselConfig'

function useInvalidate() {
  const qc = useQueryClient()
  return () => qc.invalidateQueries({ queryKey: carouselQueryKeys.config() })
}

export function useUploadSlideMutation(): UseMutationResult<
  CarouselSlide,
  Error,
  File
> {
  const invalidate = useInvalidate()
  return useMutation<CarouselSlide, Error, File>({
    mutationFn: uploadSlide,
    onSuccess: invalidate,
  })
}

export function useDeleteSlideMutation(): UseMutationResult<
  void,
  Error,
  number
> {
  const invalidate = useInvalidate()
  return useMutation<void, Error, number>({
    mutationFn: deleteSlide,
    onSuccess: invalidate,
  })
}

export function useReorderSlidesMutation(): UseMutationResult<
  void,
  Error,
  number[]
> {
  const invalidate = useInvalidate()
  return useMutation<void, Error, number[]>({
    mutationFn: reorderSlides,
    onSuccess: invalidate,
  })
}

export function useUpdateIntervalMutation(): UseMutationResult<
  void,
  Error,
  number
> {
  const invalidate = useInvalidate()
  return useMutation<void, Error, number>({
    mutationFn: updateInterval,
    onSuccess: invalidate,
  })
}

export function useUploadOverlayMutation(): UseMutationResult<
  void,
  Error,
  File
> {
  const invalidate = useInvalidate()
  return useMutation<void, Error, File>({
    mutationFn: uploadOverlay,
    onSuccess: invalidate,
  })
}

export function useDeleteOverlayMutation(): UseMutationResult<
  void,
  Error,
  void
> {
  const invalidate = useInvalidate()
  return useMutation<void>({
    mutationFn: deleteOverlay,
    onSuccess: invalidate,
  })
}
