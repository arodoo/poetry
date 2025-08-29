/*
 File: routes.ts
 Purpose: Central route registry referencing i18n keys for titles
 and slugs. All Rights Reserved. Arodi Emmanuel
*/
import { type RouteDefinition, type RouteLookupMap } from './routes.types'

const routesList: RouteDefinition[] = [
  {
    id: 'home',
    path: '/',
    titleKey: 'ui.route.home.title',
    slugKey: 'ui.route.home.slug',
  },
  {
    id: 'demo',
    path: '/demo',
    titleKey: 'ui.route.demo.title',
    slugKey: 'ui.route.demo.slug',
  },
]

const routesById: RouteLookupMap = routesList.reduce<RouteLookupMap>(
  (acc: RouteLookupMap, r: RouteDefinition): RouteLookupMap => {
    acc[r.id] = r
    return acc
  },
  {}
)

export { routesList, routesById }
