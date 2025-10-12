/*
 * File: TokenSelectors.tsx
 * Purpose: Render grouped selectors for theme tokens. It forwards the
 * selected values through a callback so the parent can update state.
 * It keeps layout small and readable with short utility classes.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { SelectRow } from './SelectRow'
import type { TokenBundle } from '../../tokens/model/TokensSchemas'

export interface TokenSelectorsProps {
  bundle: TokenBundle
  current: TokenBundle['current']
  onChange: (field: string, value: string) => void
}

export function TokenSelectors({
  bundle,
  current,
  onChange,
}: TokenSelectorsProps): ReactElement {
  const containerCls = 'grid gap-3 sm:grid-cols-3 text-sm p-3 border rounded'
  const surface = 'bg-[var(--color-surface,#fafafa)]'
  return (
    <div className={`${containerCls} ${surface}`}>
      <SelectRow
        label="Theme"
        value={current.theme}
        options={bundle.themes}
        field="theme"
        onChange={onChange}
      />
      <SelectRow
        label="Font"
        value={current.font}
        options={bundle.fonts}
        field="font"
        onChange={onChange}
      />
      <SelectRow
        label="Font Size"
        value={current.fontSize}
        options={bundle.fontSizes}
        field="fontSize"
        onChange={onChange}
      />
      <SelectRow
        label="Spacing"
        value={current.spacing}
        options={bundle.spacings}
        field="spacing"
        onChange={onChange}
      />
      <SelectRow
        label="Radius"
        value={current.radius}
        options={bundle.radius}
        field="radius"
        onChange={onChange}
      />
      <SelectRow
        label="Shadow"
        value={current.shadow}
        options={bundle.shadows}
        field="shadow"
        onChange={onChange}
      />
    </div>
  )
}
