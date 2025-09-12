/*
 File: Stack.test.tsx
 Purpose: Smoke test for Stack vertical layout.
 All Rights Reserved. Arodi Emmanuel
*/
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Stack } from '../../../ui'

describe('Stack', () => {
  it('renders children in order', () => {
    render(
      <Stack gap="sm">
        <span>One</span>
        <span>Two</span>
      </Stack>
    )
    const items = screen.getAllByText(/One|Two/)
    expect(items.length).toBe(2)
    expect(items[0]!.textContent).toBe('One')
    expect(items[1]!.textContent).toBe('Two')
  })
})
