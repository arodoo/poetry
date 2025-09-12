/*
 File: TokenSwitcherPanel.test.tsx
 Purpose: Verify switching a select updates CSS variables set by theme
 change. The test stubs the data hook to control inputs and asserts the
 computed style updates. This ensures the mapping layer stays wired.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { TokenSwitcherPanel } from '../../../../features/tokens'
import * as hook from '../../../../features/tokens/hooks/useTokensQueries'

const bundle = {
  themes: [
    { key: 'amber', label: 'Amber', colors: { primary: '#111' } },
    { key: 'blue', label: 'Blue', colors: { primary: '#00f' } },
  ],
  fonts: [],
  fontFamilies: [{ key: 'inter', label: 'Inter', family: 'Inter, sans-serif' }],
  fontWeights: ['400'],
  fontSizes: [{ key: 'default', label: 'Default', sizes: { base: '1rem' } }],
  spacings: [{ key: 'default', label: 'Default', values: { md: '1rem' } }],
  radius: [{ key: 'default', label: 'Default', values: { md: '4px' } }],
  shadows: [
    { key: 'default', label: 'Default', values: { md: '0 0 2px #000' } },
  ],
  current: {
    theme: 'amber',
    font: 'inter',
    fontSize: 'default',
    spacing: 'default',
    radius: 'default',
    shadow: 'default',
  },
}

describe('TokenSwitcherPanel', () => {
  it('applies new theme on change', () => {
    vi.spyOn(hook, 'useTokensQuery').mockReturnValue({
      data: { bundle, etag: '1' },
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof hook.useTokensQuery>)
    const { getByLabelText } = render(<TokenSwitcherPanel />)
    const select = getByLabelText('Theme') as HTMLSelectElement
    // initial
    const css1 = getComputedStyle(document.documentElement)
    expect(css1.getPropertyValue('--color-primary')).toBe('#111')
    // change
    fireEvent.change(select, { target: { value: 'blue' } })
    const css2 = getComputedStyle(document.documentElement)
    expect(css2.getPropertyValue('--color-primary')).toBe('#00f')
  })
})
