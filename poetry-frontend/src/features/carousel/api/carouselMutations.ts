/*
 * File: carouselMutations.ts
 * Purpose: Mutation functions for admin carousel management.
 * All require a Bearer token in the Authorization header.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  CarouselSlideSchema,
  type CarouselSlide,
} from '../model/CarouselSchemas'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'

const BASE = '/api/v1/carousel'

function authHeader(): HeadersInit {
  const token = tokenStorage.load()?.accessToken
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function uploadSlide(file: File): Promise<CarouselSlide> {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${BASE}/slides`, {
    method: 'POST',
    headers: authHeader(),
    body: form,
  })
  if (!res.ok) throw new Error(`carousel.slide.upload.failed: ${res.status}`)
  const json: unknown = await res.json()
  return CarouselSlideSchema.parse(json)
}

export async function deleteSlide(id: number): Promise<void> {
  const res = await fetch(`${BASE}/slides/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  })
  if (!res.ok) throw new Error(`carousel.slide.delete.failed: ${res.status}`)
}

export async function reorderSlides(orderedIds: number[]): Promise<void> {
  const res = await fetch(`${BASE}/slides/order`, {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(orderedIds),
  })
  if (!res.ok) throw new Error(`carousel.slide.reorder.failed: ${res.status}`)
}

export async function updateInterval(intervalMs: number): Promise<void> {
  const res = await fetch(`${BASE}/config/interval`, {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(intervalMs),
  })
  if (!res.ok) throw new Error(`carousel.interval.update.failed: ${res.status}`)
}

export async function uploadOverlay(file: File): Promise<void> {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${BASE}/config/overlay`, {
    method: 'POST',
    headers: authHeader(),
    body: form,
  })
  if (!res.ok) throw new Error(`carousel.overlay.upload.failed: ${res.status}`)
}

export async function deleteOverlay(): Promise<void> {
  const res = await fetch(`${BASE}/config/overlay`, {
    method: 'DELETE',
    headers: authHeader(),
  })
  if (!res.ok) throw new Error(`carousel.overlay.delete.failed: ${res.status}`)
}

export function mediaUrl(filename: string): string {
  return `${BASE}/media/${filename}`
}
