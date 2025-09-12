/*
 File: Select.test.tsx
 Purpose: Smoke test for Select rendering options.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Select } from '../../../ui/Select/Select'

describe('Select', () => {
  it('renders options', () => {
    const { getByDisplayValue } = render(
      <Select aria-label="example">
        <option value="a">A</option>
      </Select>
    )
    expect(getByDisplayValue('A')).toBeTruthy()
  })
})
