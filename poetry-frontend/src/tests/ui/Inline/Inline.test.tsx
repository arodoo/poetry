/*
 File: Inline.test.tsx
 Purpose: Smoke test for Inline horizontal layout.
 All Rights Reserved. Arodi Emmanuel
*/
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Inline } from '../../../ui'

describe('Inline', () => {
  it('renders children with wrap', () => {
    render(
      <Inline gap="xs" wrap>
        <span>A</span>
        <span>B</span>
      </Inline>
    )
    const a = screen.getByText('A')
    const b = screen.getByText('B')
    expect(a).toBeInTheDocument()
    expect(b).toBeInTheDocument()
  })
})
