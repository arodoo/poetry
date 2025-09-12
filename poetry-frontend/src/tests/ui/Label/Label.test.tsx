/*
 File: Label.test.tsx
 Purpose: Smoke test for Label with required mark.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Label } from '../../../ui/Label/Label'

describe('Label', () => {
  it('renders required mark', () => {
    const { getByText } = render(<Label requiredMark>Name</Label>)
    expect(getByText('*')).toBeTruthy()
  })
})
