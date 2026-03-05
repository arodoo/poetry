/*
 * File: ThemeCreatorColorRow.tsx
 * Purpose: Single row in the Theme Creator form showing a color key
 * label and an HTML color input. Converts between HSL strings and
 * hex values for the native color picker.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { hslToHex, hexToHsl } from '../../model/hslHexConvert'

interface Props {
  readonly colorKey: string
  readonly value: string
  readonly onChange: (key: string, hsl: string) => void
}

export function ThemeCreatorColorRow(props: Props): ReactElement {
  const hex: string = hslToHex(props.value)
  return (
    <div className="flex items-center gap-sm">
      <label className="text-sm text-text w-28 truncate">
        {props.colorKey}
      </label>
      <input
        type="color"
        data-testid={`theme-color-${props.colorKey}`}
        value={hex}
        onChange={(e): void => {
          props.onChange(props.colorKey, hexToHsl(e.target.value))
        }}
        className="w-8 h-8 rounded cursor-pointer border border-border"
      />
      <span className="text-xs text-textMuted font-mono">
        {hex}
      </span>
    </div>
  )
}
