/*
 * File: types.ts
 * Purpose: Type definitions for sidebar navigation.
 * All Rights Reserved. Arodi Emmanuel
 */
export type ItemId = 'dashboard' | 'users' | 'adminTokens' | 'sellerCodes' | 'zones'

export interface SidebarProps {
  isOpen: boolean
}

export interface NavigationItem {
  id: ItemId
  p: string
  roles: string[]
}
