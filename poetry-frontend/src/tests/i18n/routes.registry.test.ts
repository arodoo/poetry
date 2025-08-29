/*
 File: routes.registry.test.ts
 Purpose: Validate route registry structure and i18n key refs.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { routesList, routesById } from '../../shared/routing/routes'

describe('routes.registry', () => {
  it('contains home and demo with expected paths', () => {
    expect(routesById.home.path).toBe('/')
    expect(routesById.demo.path).toBe('/demo')
  })
  it('list has matching i18n keys', () => {
    const ids = routesList.map((r) => r.id).sort()
    expect(ids).toEqual(['demo', 'home'])
    routesList.forEach((r) => {
      expect(r.titleKey.startsWith('ui.route.')).toBe(true)
      expect(r.slugKey.startsWith('ui.route.')).toBe(true)
    })
  })
})
