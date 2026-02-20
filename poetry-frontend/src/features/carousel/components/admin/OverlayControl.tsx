/*
 * File: OverlayControl.tsx
 * Purpose: Admin control to upload or remove the static overlay image.
 * Shows current preview thumbnail when an overlay is set.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ChangeEvent } from 'react'
import { useRef } from 'react'
import { mediaUrl } from '../../api/carouselMutations'

interface Props {
  currentFilename: string | null
  onUpload: (file: File) => void
  onDelete: () => void
  isUploading: boolean
  isDeleting: boolean
  uploadLabel: string
  removeLabel: string
}

export function OverlayControl({
  currentFilename,
  onUpload,
  onDelete,
  isUploading,
  isDeleting,
  uploadLabel,
  removeLabel,
}: Props): ReactElement {
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const file: File | undefined = e.target.files?.[0]
    if (file) onUpload(file)
    e.target.value = ''
  }

  return (
    <div className="flex flex-col gap-2">
      {currentFilename && (
        <div className="flex items-center gap-3">
          <img
            src={mediaUrl(currentFilename)}
            alt="overlay preview"
            className="h-16 w-16 rounded-lg object-contain ring-1 ring-[var(--color-border)]"
          />
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="text-sm text-[var(--color-danger)] hover:underline disabled:opacity-40"
          >
            {removeLabel}
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        disabled={isUploading}
      />
      <button
        onClick={(): void => inputRef.current?.click()}
        disabled={isUploading}
        className={
          'rounded-md border border-[var(--color-border)] px-4 py-2 text-sm ' +
          'text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] ' +
          'disabled:opacity-40 transition-colors'
        }
      >
        {isUploading ? '...' : uploadLabel}
      </button>
    </div>
  )
}
