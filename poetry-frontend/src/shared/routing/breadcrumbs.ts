/*
 File: breadcrumbs.ts
 Purpose: Pure breadcrumb builder using route registry and i18n
 key references only. All Rights Reserved. Arodi Emmanuel
*/
import { routesById, routesList } from './routes'
import type { RouteDefinition, RouteId } from './routes.types'

export interface BreadcrumbItem {
  id: RouteId
  href: string
  titleKey: RouteDefinition['titleKey']
}

export function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (!pathname.startsWith('/')) return []
  const segments: string[] =
    pathname === '/' ? [''] : pathname.split('/').slice(1)
  const crumbs: BreadcrumbItem[] = []
  let currentPath = ''

  for (const seg of segments) {
    currentPath += '/' + seg
    const match: RouteDefinition | undefined = routesList.find(
      (r: RouteDefinition): boolean => r.path === currentPath
    )
    if (match) {
      const item: BreadcrumbItem = {
        id: match.id,
        href: match.path,
        titleKey: match.titleKey,
      }
      crumbs.push(item)
    }
  }

  if (
    pathname !== '/' &&
    !crumbs.find((c: BreadcrumbItem): boolean => c.id === 'home')
  ) {
    const home: RouteDefinition | undefined = routesById['home']
    if (home) {
      crumbs.unshift({ id: home.id, href: home.path, titleKey: home.titleKey })
    }
  }

  return crumbs
}
