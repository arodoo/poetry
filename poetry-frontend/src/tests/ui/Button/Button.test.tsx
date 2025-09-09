/*
 File: Button.test.tsx
 Purpose: Smoke tests for the Button component covering default and
 variant/size combinations. The tests render the button and assert
 CSS class presence to validate the token-driven styling and ensure
 the component exposes sensible defaults for consumers.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { Button } from '../../../ui/Button/Button'

describe('Button', () => {
  afterEach(() => {
    cleanup()
  })
  it('renders primary medium by default', () => {
    const { getByRole } = render(<Button>label</Button>)
    expect(getByRole('button').className).toMatch(/bg-/)
  })
  it('renders secondary small', () => {
    const { getByRole } = render(
      <Button variant="secondary" size="sm">
        label
      </Button>
    )
    const btn = getByRole('button') as HTMLButtonElement
    expect(btn.className).toMatch(/border/)
  })
})
