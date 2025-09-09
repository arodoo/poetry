/*
 File: Text.test.tsx
 Purpose: Smoke tests for the Text primitive verifying size and weight
 mapping to Tailwind classes. The tests ensure default rendering and
 alternative props produce the expected class names, providing
 confidence in the primitive used across components.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Text } from '../../../ui/Text/Text'

describe('Text', () => {
  it('renders md regular by default', () => {
    const { getByText } = render(<Text>hello</Text>)
    expect(getByText('hello').className).toMatch(/text-sm/)
  })
  it('renders lg bold', () => {
    const { getByText } = render(
      <Text size="lg" weight="bold">
        hi
      </Text>
    )
    expect(getByText('hi').className).toMatch(/text-base/)
  })
})
