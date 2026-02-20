/*
 * File: CarouselSchemas.ts
 * Purpose: Zod schemas for carousel config and slide data.
 * Aligned with backend CarouselConfigResponse and SlideResponse.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const SlideTypeSchema = z.enum(['IMAGE', 'VIDEO'])

export const CarouselSlideSchema = z.object({
  id: z.number(),
  type: SlideTypeSchema,
  filename: z.string(),
  originalName: z.string(),
  sortOrder: z.number(),
  createdAt: z.string(),
})

export const CarouselConfigSchema = z.object({
  intervalMs: z.number().int().positive(),
  overlayFilename: z.string().nullable(),
  slides: z.array(CarouselSlideSchema),
})

export type SlideType = z.infer<typeof SlideTypeSchema>
export type CarouselSlide = z.infer<typeof CarouselSlideSchema>
export type CarouselConfig = z.infer<typeof CarouselConfigSchema>
