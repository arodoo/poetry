/*
 File: routes.types.ts
 Purpose: Type definitions for the route registry. Ensures compile-time safety
 and coupling between route ids and i18n keys. Keeps route metadata consistent.
 All Rights Reserved. Arodi Emmanuel
*/
import type { I18nKey } from '../i18n/generated/keys'

export type RouteId =
  | 'home'
  | 'demo'
  | 'adminTokens'
  | 'unauthorized'
  | 'dashboard'

export interface RouteDefinition {
  id: RouteId
  path: string
  titleKey: I18nKey
  slugKey: I18nKey
  children?: RouteDefinition[]
}

export type RouteLookupMap = Record<string, RouteDefinition>
