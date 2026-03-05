/*
 * File: ThemeCreatorColorsGrid.tsx
 * Purpose: Renders a responsive grid of ThemeCreatorColorRow components
 * for all 19 theme color keys. Keeps the main form small.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { THEME_COLOR_KEYS } from '../../model/themeColorKeys'
import { ThemeCreatorColorRow } from './ThemeCreatorColorRow'

interface Props {
  readonly colors: Record<string, string>
  readonly onColorChange: (key: string, value: string) => void
}

export function ThemeCreatorColorsGrid(props: Props): ReactElement {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-sm">
      {THEME_COLOR_KEYS.map((key: string): ReactElement => (
        <ThemeCreatorColorRow
          key={key}
          colorKey={key}
          value={props.colors[key] ?? '#888888'}
          onChange={props.onColorChange}
        />
      ))}
    </div>
  )
}
