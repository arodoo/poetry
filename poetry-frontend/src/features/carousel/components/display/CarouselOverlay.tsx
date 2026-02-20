/*
 * File: CarouselOverlay.tsx
 * Purpose: Renders the static overlay image in the bottom-right corner.
 * Shown only when an overlay filename is configured.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { mediaUrl } from '../../api/carouselMutations'

interface Props {
  filename: string | null
}

export function CarouselOverlay({ filename }: Props): ReactElement | null {
  if (!filename) return null
  return (
    <img
      src={mediaUrl(filename)}
      alt="overlay"
      className={
        'pointer-events-none absolute bottom-6 right-6 z-20 ' +
        'h-28 w-28 rounded-xl object-contain shadow-2xl ' +
        'ring-2 ring-white/30 backdrop-blur-sm'
      }
    />
  )
}
