/*
 * File: UserMenuCoreLogic.tsx
 * Purpose: Orchestrate user menu behaviour by composing focused helpers
 * so the presentational component stays lean.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, useRef } from 'react'
import { useDocumentClick } from '../hooks/useDocumentClick'
import {
  useUserMenuDependencies,
  type UserMenuDependencies,
} from './useUserMenuDependencies'
import { createLogoutExecutor } from './userMenuLogout'
import { buildUserMenuLabels } from './userMenuLabels'

export interface UserMenuCoreResult {
  readonly isOpen: boolean
  readonly buttonReference: React.RefObject<HTMLButtonElement | null>
  readonly menuReference: React.RefObject<HTMLDivElement | null>
  readonly toggleMenu: () => void
  readonly closeMenu: () => void
  readonly executeLogout: () => Promise<void>
  readonly logoutMutation: UserMenuDependencies['logoutMutation']
  readonly username: string
  readonly profilePath: string
  readonly logoutLabel: string
  readonly translate: UserMenuDependencies['translate']
}

export function useUserMenuCore(): UserMenuCoreResult {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const buttonReference: React.RefObject<HTMLButtonElement | null> =
    useRef<HTMLButtonElement | null>(null)
  const menuReference: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null)
  const dependencies: UserMenuDependencies = useUserMenuDependencies()

  const closeMenu: () => void = (): void => {
    setIsOpen(false)
  }
  const toggleMenu: () => void = (): void => {
    setIsOpen((previous: boolean): boolean => !previous)
  }

  useDocumentClick(isOpen, [menuReference, buttonReference], closeMenu)

  const executeLogout: () => Promise<void> = createLogoutExecutor({
    closeMenu,
    logoutMutation: dependencies.logoutMutation,
    navigate: dependencies.navigate,
    locale: dependencies.locale,
  })

  const { profilePath, logoutLabel } = buildUserMenuLabels(dependencies)

  return {
    isOpen,
    buttonReference,
    menuReference,
    toggleMenu,
    closeMenu,
    executeLogout,
    logoutMutation: dependencies.logoutMutation,
    username: dependencies.username,
    profilePath,
    logoutLabel,
    translate: dependencies.translate,
  }
}

export default useUserMenuCore
