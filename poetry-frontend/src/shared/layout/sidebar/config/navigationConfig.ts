/*
 * File: navigationConfig.ts
 * Purpose: Navigation items config sorted logically with icons.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  HomeIcon,
  UsersIcon,
  TicketIcon,
  CreditCardIcon,
  MapPinIcon,
  UserGroupIcon,
  KeyIcon,
  ChartBarIcon,
  CpuChipIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline'
import type { ItemId, NavigationItem } from '../types'

export function getLabelKey(id: ItemId): string {
  const map: Record<ItemId, string> = {
    dashboard: 'ui.route.dashboard.title',
    users: 'ui.route.users.title',
    memberships: 'ui.route.memberships.title',
    subscriptions: 'ui.route.subscriptions.title',
    zones: 'ui.route.zones.title',
    sellerCodes: 'ui.route.sellerCodes.title',
    adminTokens: 'ui.route.admin.tokens.title',
    adminStats: 'ui.adminStats.title',
    hardware: 'ui.hardware.breadcrumb',
    charts: 'ui.route.charts.title',
  }
  return map[id]
}

export function getNavigationItems(): NavigationItem[] {
  return [
    { id: 'dashboard', p: '/dashboard', roles: [], icon: HomeIcon },
    {
      id: 'charts',
      p: '/charts',
      roles: ['admin', 'manager'],
      icon: ChartPieIcon,
    },
    {
      id: 'users',
      p: '/users',
      roles: ['admin', 'manager'],
      icon: UsersIcon,
    },
    {
      id: 'memberships',
      p: '/memberships',
      roles: ['admin', 'manager'],
      icon: UserGroupIcon,
    },
    {
      id: 'subscriptions',
      p: '/subscriptions',
      roles: ['admin', 'manager'],
      icon: CreditCardIcon,
    },
    {
      id: 'zones',
      p: '/zones',
      roles: ['admin', 'manager'],
      icon: MapPinIcon,
    },
    {
      id: 'sellerCodes',
      p: '/seller-codes',
      roles: ['admin', 'manager'],
      icon: TicketIcon,
    },
    {
      id: 'adminTokens',
      p: '/admin/tokens',
      roles: ['admin', 'manager'],
      icon: KeyIcon,
    },
    {
      id: 'adminStats',
      p: '/admin/stats',
      roles: ['admin'],
      icon: ChartBarIcon,
    },
    {
      id: 'hardware',
      p: '/hardware',
      roles: ['admin'],
      icon: CpuChipIcon,
    },
  ]
}
