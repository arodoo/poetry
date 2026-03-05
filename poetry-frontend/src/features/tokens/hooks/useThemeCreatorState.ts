/*
 * File: useThemeCreatorState.ts
 * Purpose: Manages the local form state for the Theme Creator.
 * Provides name, colors map, and handlers to update individual
 * color keys or clone from an existing base theme.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, useCallback } from 'react'
import { THEME_COLOR_KEYS } from '../model/themeColorKeys'
import type { TokenTheme } from '../model/TokensSchemas'

const INITIAL_GREY = 'hsl(220 10% 65%)'

function buildDefault(): Record<string, string> {
  const m: Record<string, string> = {}
  THEME_COLOR_KEYS.forEach((k: string): void => { m[k] = INITIAL_GREY })
  return m
}

export function useThemeCreatorState(themes: readonly TokenTheme[]) {
  const [name, setName] = useState('')
  const [colors, setColors] = useState<Record<string, string>>(buildDefault)

  const setColor = useCallback((key: string, val: string): void => {
    setColors((prev) => ({ ...prev, [key]: val }))
  }, [])

  const applyBase = useCallback((themeKey: string): void => {
    const found = themes.find((t) => t.key === themeKey)
    if (found) setColors({ ...found.colors })
  }, [themes])

  const reset = useCallback((): void => {
    setName('')
    setColors(buildDefault())
  }, [])

  return { name, setName, colors, setColor, applyBase, reset }
}
