/*
 * File: MenuItem.types.ts
 * Purpose: Type declarations for MenuItem to keep the component file
 * within repository size constraints.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { MouseEvent, ReactNode } from 'react'

export interface BaseMenuItemProps {
  readonly children: ReactNode
  readonly onClick?: (event: MouseEvent) => void
  readonly disabled?: boolean
  readonly danger?: boolean
  readonly 'data-testid'?: string
  readonly role?: string
  readonly className?: string
}

export interface LinkMenuItemProps extends BaseMenuItemProps {
  readonly to: string
  readonly as?: 'link'
}

export interface ButtonMenuItemProps extends BaseMenuItemProps {
  readonly to?: undefined
  readonly as?: 'button'
}

export type MenuItemProps = LinkMenuItemProps | ButtonMenuItemProps
