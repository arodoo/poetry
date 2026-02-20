/*
 * File: useCarouselPlayer.ts
 * Purpose: Manages auto-advance state for the carousel player.
 * Resets the timer whenever the slide count or interval changes.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useCallback, useEffect, useRef, useState } from 'react'

interface PlayerState {
  index: number
  goNext: () => void
  goPrev: () => void
  goTo: (i: number) => void
}

export function useCarouselPlayer(
  slideCount: number,
  intervalMs: number
): PlayerState {
  const [index, setIndex] = useState<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = useCallback((): void => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startTimer = useCallback((): void => {
    clearTimer()
    if (slideCount <= 1) return
    timerRef.current = setInterval((): void => {
      setIndex((prev: number): number => (prev + 1) % slideCount)
    }, intervalMs)
  }, [slideCount, intervalMs, clearTimer])

  useEffect((): (() => void) => {
    setIndex(0)
    startTimer()
    return clearTimer
  }, [slideCount, intervalMs, startTimer, clearTimer])

  const goNext = useCallback((): void => {
    setIndex((prev: number): number => (prev + 1) % slideCount)
    startTimer()
  }, [slideCount, startTimer])

  const goPrev = useCallback((): void => {
    setIndex(
      (prev: number): number => (prev - 1 + slideCount) % slideCount
    )
    startTimer()
  }, [slideCount, startTimer])

  const goTo = useCallback(
    (i: number): void => {
      setIndex(i)
      startTimer()
    },
    [startTimer]
  )

  return { index, goNext, goPrev, goTo }
}
