/*
 * File: useCarouselConfig.ts
 * Purpose: React Query hook for fetching the carousel configuration.
 * Polls every 30 s so the TV display picks up admin changes automatically.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchCarouselConfig } from '../api/carouselQueries'
import { type CarouselConfig } from '../model/CarouselSchemas'

export const carouselQueryKeys = {
  config: () => ['carousel', 'config'] as const,
} as const

export function useCarouselConfig(): UseQueryResult<CarouselConfig> {
  return useQuery<CarouselConfig>({
    queryKey: carouselQueryKeys.config(),
    queryFn: fetchCarouselConfig,
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
  })
}
