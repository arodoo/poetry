/*
 * File: CarouselSlideView.tsx
 * Purpose: Renders a single carousel slide as an image or video.
 * Videos autoplay muted and loop. Uses object-cover for full bleed.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { mediaUrl } from '../../api/carouselMutations'
import type { CarouselSlide } from '../../model/CarouselSchemas'

interface Props {
  slide: CarouselSlide
  active: boolean
}

export function CarouselSlideView({ slide, active }: Props): ReactElement {
  const url: string = mediaUrl(slide.filename)
  const base =
    'absolute inset-0 w-full h-full object-contain transition-opacity duration-700'
  const opacity: string = active ? 'opacity-100' : 'opacity-0'

  if (slide.type === 'VIDEO') {
    return (
      <video
        key={slide.id}
        className={`${base} ${opacity}`}
        src={url}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden={!active}
      />
    )
  }

  return (
    <img
      key={slide.id}
      className={`${base} ${opacity}`}
      src={url}
      alt={slide.originalName}
      aria-hidden={!active}
    />
  )
}
