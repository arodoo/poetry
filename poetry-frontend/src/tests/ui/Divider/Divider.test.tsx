/*
 File: Divider.test.tsx
 Purpose: Smoke test for Divider component.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Divider } from '../../../ui/Divider/Divider'

describe('Divider', () => {
  it('renders an hr', () => {
    const { container } = render(<Divider />)
    const hr = container.querySelector('hr')
    expect(hr).toBeTruthy()
  })
})
