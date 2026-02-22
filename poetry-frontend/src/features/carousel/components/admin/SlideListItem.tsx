/*
 * File: SlideListItem.tsx
 * Purpose: Single row in the slide list showing thumbnail, name, type
 * and delete action. Supports drag handle for reordering.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { mediaUrl } from '../../api/carouselMutations'
import type { CarouselSlide } from '../../model/CarouselSchemas'

interface Props {
  slide: CarouselSlide
  onDelete: (id: number) => void
  isDeleting: boolean
  deleteLabel: string
}

export function SlideListItem({
  slide,
  onDelete,
  isDeleting,
  deleteLabel,
}: Props): ReactElement {
  const thumb: string = mediaUrl(slide.filename)
  return (
    <li className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] p-2">
      {/* Thumbnail */}
      {slide.type === 'IMAGE' ? (
        <img
          src={thumb}
          alt={slide.originalName}
          className="h-12 w-16 rounded object-cover"
        />
      ) : (
        <video src={thumb} className="h-12 w-16 rounded object-cover" muted />
      )}

      {/* Name + badge */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <span className="truncate text-sm font-medium text-[var(--color-text)]">
          {slide.originalName}
        </span>
        <span className="text-xs text-[var(--color-muted)]">{slide.type}</span>
      </div>

      {/* Delete */}
      <button
        onClick={(): void => {
          onDelete(slide.id)
        }}
        disabled={isDeleting}
        aria-label={deleteLabel}
        className="shrink-0 rounded-full p-1 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 disabled:opacity-40"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
  )
}
