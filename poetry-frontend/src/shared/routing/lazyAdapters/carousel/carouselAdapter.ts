/*
 * File: carouselAdapter.ts
 * Purpose: Lazy default-export adapter for the Carousel (Dashboard TV) page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, LazyExoticComponent } from 'react'
import { lazy } from 'react'

interface CarouselModule {
  default?: () => ReactElement
  CarouselPage?: () => ReactElement
}

export const CarouselPageLazy: LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import('../../../../features/carousel/pages/CarouselPage').then(
      (m: unknown): { default: () => ReactElement } => {
        const mod: CarouselModule = m as CarouselModule
        const page: () => ReactElement =
          mod.default ?? (mod.CarouselPage as () => ReactElement)
        return { default: page }
      }
    )
)
