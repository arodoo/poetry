/*
 * File: carouselQueries.ts
 * Purpose: Fetch functions for carousel configuration. Uses native fetch
 * against the public /api/v1/carousel/config endpoint (no auth required).
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  CarouselConfigSchema,
  type CarouselConfig,
} from '../model/CarouselSchemas'

const BASE = '/api/v1/carousel'

export async function fetchCarouselConfig(): Promise<CarouselConfig> {
  const res = await fetch(`${BASE}/config`)
  if (!res.ok) throw new Error(`carousel.config.fetch.failed: ${res.status}`)
  const json: unknown = await res.json()
  return CarouselConfigSchema.parse(json)
}
