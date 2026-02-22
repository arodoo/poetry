/*
 * File: IntervalControl.tsx
 * Purpose: Input that lets the admin set the auto-advance interval in seconds.
 * Converts between ms (backend) and seconds (human-readable display).
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ChangeEvent } from 'react'
import { useState } from 'react'

interface Props {
  currentMs: number
  onSave: (ms: number) => void
  isPending: boolean
  label: string
  saveLabel: string
}

export function IntervalControl({
  currentMs,
  onSave,
  isPending,
  label,
  saveLabel,
}: Props): ReactElement {
  const [seconds, setSeconds] = useState<number>(Math.round(currentMs / 1000))

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setSeconds(Number(e.target.value))
  }

  function handleSave(): void {
    onSave(Math.max(1, seconds) * 1000)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[var(--color-text)]">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          min={1}
          max={60}
          value={seconds}
          onChange={handleChange}
          className={
            'w-24 rounded-md border border-[var(--color-border)] ' +
            'bg-[var(--color-surface)] px-3 py-1.5 text-sm ' +
            'text-[var(--color-text)] focus:outline-none ' +
            'focus:ring-2 focus:ring-[var(--color-primary)]'
          }
        />
        <button
          onClick={handleSave}
          disabled={isPending}
          className={
            'rounded-md bg-[var(--color-primary)] px-4 py-1.5 text-sm ' +
            'font-medium text-white disabled:opacity-50 ' +
            'hover:opacity-90 transition-opacity'
          }
        >
          {saveLabel}
        </button>
      </div>
    </div>
  )
}
