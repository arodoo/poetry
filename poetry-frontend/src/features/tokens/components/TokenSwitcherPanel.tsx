/*
 File: TokenSwitcherPanel.tsx
 Purpose: Admin panel for switching active token selections locally (theme,
 font family, font size scale, spacing, radius, shadow). Persists choices
 in-memory only; future backend integration will replace this. Applies
 overrides by mutating documentElement CSS variables using existing
 mapping logic.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, useCallback, useState, useEffect } from 'react'
import { useTokensQuery } from '../hooks/useTokensQueries'
import { applyCss } from './applyCss'
import type { TokenBundle } from '../../tokens/model/TokensSchemas'
import { TokenSelectors } from './TokenSelectors'
import type { OverridesState } from './OverridesState'

export function TokenSwitcherPanel(): ReactElement | null {
  const { data } = useTokensQuery()
  const [overrides, setOverrides] = useState<OverridesState>({})

  const mergedBundle: () => TokenBundle | undefined = useCallback(():
    | TokenBundle
    | undefined => {
    if (!data) return undefined
    return { ...data.bundle, current: { ...data.bundle.current, ...overrides } }
  }, [data, overrides])

  useEffect((): void => {
    const merged: TokenBundle | undefined = mergedBundle()
    if (merged) applyCss(merged)
  }, [mergedBundle])

  if (!data) return null
  const b: TokenBundle = data.bundle
  const cur: TokenBundle['current'] = { ...b.current, ...overrides }

  const updateOverride: (field: string, value: string) => void = (
    field: string,
    value: string
  ): void => {
    setOverrides(
      (prev: OverridesState): OverridesState => ({ ...prev, [field]: value })
    )
  }

  return <TokenSelectors bundle={b} current={cur} onChange={updateOverride} />
}
