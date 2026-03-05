/*
 * File: themeColorKeys.ts
 * Purpose: Canonical list of the 19 theme color keys matching the
 * backend ColorPalette value object. Shared by the Theme Creator
 * form and any component needing to enumerate color slots.
 * All Rights Reserved. Arodi Emmanuel
 */

export const THEME_COLOR_KEYS: readonly string[] = [
  'primary',
  'secondary',
  'accent',
  'info',
  'warning',
  'error',
  'success',
  'surface',
  'background',
  'border',
  'muted',
  'text',
  'onPrimary',
  'onSecondary',
  'onSurface',
  'textMuted',
  'textSubtle',
  'onWarning',
  'overlay',
] as const
