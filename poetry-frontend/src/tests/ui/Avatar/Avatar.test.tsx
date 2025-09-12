/*
 File: Avatar.test.tsx
 Purpose: Smoke test for Avatar component fallback initials.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Avatar } from '../../../ui/Avatar/Avatar'

describe('Avatar', () => {
  it('renders initials when no src', () => {
    const { getByLabelText } = render(<Avatar name="Jane Doe" />)
    const el = getByLabelText('Jane Doe')
    expect(el.textContent).toBe('JD')
  })
})
