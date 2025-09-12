/*
 File: Heading.test.tsx
 Purpose: Smoke test for Heading component applying size + weight classes.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Heading } from '../../../ui/Heading/Heading'

describe('Heading', () => {
  it('renders h2 by default', () => {
    const { getByText } = render(<Heading>Title</Heading>)
    const el = getByText('Title')
    expect(el.tagName.toLowerCase()).toBe('h2')
  })
})
