/*
 File: breadcrumbs.builder.test.ts
 Purpose: Ensure breadcrumb builder returns correct sequence.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { buildBreadcrumbs } from '../../shared/routing/breadcrumbs'

describe('breadcrumbs.builder', () => {
  it('home path returns home crumb', () => {
    const c = buildBreadcrumbs('/')
    expect(c.length).toBe(1)
    expect(c[0].id).toBe('home')
  })
  it('demo path returns home + demo', () => {
    const c = buildBreadcrumbs('/demo')
    expect(c.map((x) => x.id)).toEqual(['home', 'demo'])
  })
})
