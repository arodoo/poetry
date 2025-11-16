/*
 * File: types.ts
 * Purpose: Type definitions for sidebar navigation.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react'

export type ItemId =
  | 'dashboard'
  | 'users'
  | 'adminTokens'
  | 'sellerCodes'
  | 'subscriptions'
  | 'zones'
  | 'memberships'
  | 'fingerprint'

export interface SidebarProps {
  isOpen: boolean
  onToggle?: () => void
}

export type HeroIcon = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
>

export interface NavigationItem {
  id: ItemId
  p: string
  roles: string[]
  icon: HeroIcon
}
