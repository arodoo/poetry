/*
 * File: BlockingOverlay.test.tsx
 * Purpose: Test visibility behavior of BlockingOverlay component.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { BlockingOverlay } from '../../../ui/BlockingOverlay/BlockingOverlay'

// Keeping tests minimal and focused on contract

describe('BlockingOverlay', () => {
  it('does not render when not visible', () => {
    const { queryByTestId } = render(<BlockingOverlay visible={false} />)
    expect(queryByTestId('blocking-overlay')).toBeNull()
  })

  it('renders overlay when visible', () => {
    const { getByTestId } = render(<BlockingOverlay visible label="Loading…" />)
    expect(getByTestId('blocking-overlay')).toBeTruthy()
  })
})
