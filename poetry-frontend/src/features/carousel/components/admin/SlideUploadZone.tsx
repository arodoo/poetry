/*
 * File: SlideUploadZone.tsx
 * Purpose: Drag-and-drop or click-to-upload zone for new carousel slides.
 * Accepts images and videos up to the backend multipart limit.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, DragEvent, ChangeEvent } from 'react'
import { useRef, useState } from 'react'

interface Props {
  onUpload: (file: File) => void
  isPending: boolean
  label: string
  hint: string
}

export function SlideUploadZone({
  onUpload,
  isPending,
  label,
  hint,
}: Props): ReactElement {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [dragging, setDragging] = useState<boolean>(false)

  function handleDrop(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    setDragging(false)
    const file: File | undefined = e.dataTransfer.files[0]
    if (file) onUpload(file)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const file: File | undefined = e.target.files?.[0]
    if (file) onUpload(file)
    e.target.value = ''
  }

  return (
    <div
      onDragOver={(e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={(): void => setDragging(false)}
      onDrop={handleDrop}
      onClick={(): void => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label={label}
      className={
        'flex cursor-pointer flex-col items-center justify-center gap-2 ' +
        'rounded-xl border-2 border-dashed p-6 transition-colors ' +
        (dragging
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
          : 'border-[var(--color-border)] hover:border-[var(--color-primary)]')
      }
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleChange}
        disabled={isPending}
      />
      <svg
        className="h-8 w-8 text-[var(--color-muted)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
      <span className="text-sm text-[var(--color-muted)]">
        {isPending ? '...' : label}
      </span>
      <span className="text-xs text-[var(--color-muted)]">{hint}</span>
    </div>
  )
}
