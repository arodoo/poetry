/*
 File: routes.registry.test.ts
 Purpose: Validate route registry structure and i18n key refs.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { routesList, routesById } from '../../shared/routing/routes'

describe('routes.registry', () => {
  it('contains home and demo with expected paths', () => {
    expect(routesById['home']).toBeTruthy()
    expect(routesById['demo']).toBeTruthy()
    expect(routesById['home']!.path).toBe('/')
    expect(routesById['demo']!.path).toBe('/demo')
  })
  it('list includes required route ids and i18n key prefixes', () => {
    const ids = routesList.map((r) => r.id)
    ;['home', 'demo', 'adminTokens', 'unauthorized'].forEach((id) =>
      expect(ids).toContain(id)
    )
    routesList.forEach((r) => {
      expect(r.titleKey.startsWith('ui.route.')).toBe(true)
      expect(r.slugKey.startsWith('ui.route.')).toBe(true)
    })
  })
})
