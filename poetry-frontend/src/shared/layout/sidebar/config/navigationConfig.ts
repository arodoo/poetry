/*
 * File: navigationConfig.ts
 * Purpose: Configuration for navigation items and labels.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ItemId, NavigationItem } from '../types'

export function getLabelKey(id: ItemId): string {
  const map: Record<ItemId, string> = {
    dashboard: 'ui.route.dashboard.title',
    users: 'ui.route.users.title',
    sellerCodes: 'ui.route.sellerCodes.title',
    subscriptions: 'ui.route.subscriptions.title',
    zones: 'ui.route.zones.title',
    adminTokens: 'ui.route.admin.tokens.title',
  }
  return map[id]
}

export function getNavigationItems(): NavigationItem[] {
  return [
    { id: 'dashboard', p: '/dashboard', roles: [] },
    { id: 'users', p: '/users', roles: ['admin', 'manager'] },
    { id: 'sellerCodes', p: '/seller-codes', roles: ['admin', 'manager'] },
    { id: 'subscriptions', p: '/subscriptions', roles: ['admin', 'manager'] },
    { id: 'zones', p: '/zones', roles: ['admin', 'manager'] },
    { id: 'adminTokens', p: '/admin/tokens', roles: ['admin', 'manager'] },
  ]
}
