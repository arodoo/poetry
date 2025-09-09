/*
 File: routes.types.ts
 Purpose: Type definitions for route registry ensuring compile-time
 safety and i18n key coupling. All Rights Reserved. Arodi Emmanuel
*/
import type { I18nKey } from '../i18n/generated/keys'

export type RouteId = 'home' | 'demo' | 'adminTokens' | 'unauthorized'

export interface RouteDefinition {
  id: RouteId
  path: string
  titleKey: I18nKey
  slugKey: I18nKey
  children?: RouteDefinition[]
}

export type RouteLookupMap = Record<string, RouteDefinition>
