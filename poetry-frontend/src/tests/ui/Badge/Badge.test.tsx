/*
 File: Badge.test.tsx
 Purpose: Smoke test for Badge component rendering tone + size classes.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Badge } from '../../../ui/Badge/Badge'

describe('Badge', () => {
  it('renders with primary tone', () => {
    const { getByText } = render(<Badge>New</Badge>)
    const el = getByText('New')
    expect(el.className).toContain('bg-[var(--color-primary)]')
  })
})
