/*
 * File: CarouselControls.tsx
 * Purpose: Previous/next arrows and dot indicators for the carousel.
 * Arrows are always visible; dots show position at a glance.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'

interface Props {
  count: number
  index: number
  onPrev: () => void
  onNext: () => void
  onGoTo: (i: number) => void
}

export function CarouselControls({
  count,
  index,
  onPrev,
  onNext,
  onGoTo,
}: Props): ReactElement {
  if (count <= 1) return <></>
  return (
    <>
      {/* Prev arrow */}
      <button
        onClick={onPrev}
        aria-label="Previous slide"
        className={
          'absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full ' +
          'bg-black/40 p-3 text-white backdrop-blur-sm ' +
          'hover:bg-black/70 transition-colors'
        }
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={onNext}
        aria-label="Next slide"
        className={
          'absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full ' +
          'bg-black/40 p-3 text-white backdrop-blur-sm ' +
          'hover:bg-black/70 transition-colors'
        }
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {Array.from({ length: count }).map(
          (_, i: number): ReactElement => (
            <button
              key={i}
              onClick={(): void => { onGoTo(i); }}
              aria-label={`Go to slide ${i + 1}`}
              className={
                'h-2.5 w-2.5 rounded-full transition-all ' +
                (i === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/80')
              }
            />
          )
        )}
      </div>
    </>
  )
}
