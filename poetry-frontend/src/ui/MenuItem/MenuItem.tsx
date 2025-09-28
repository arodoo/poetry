/*
 * File: MenuItem.tsx
 * Purpose: Reusable menu item supporting link and button behaviours with
 * consistent styling.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import type { MenuItemProps } from './MenuItem.types'
import { buildMenuItemClasses } from './menuItemClasses'
import { handleMenuItemClick } from './menuItemUtils'

const defaultRole: string = 'menuitem'

function createClickHandler(
  disabled: boolean,
  onClick: MenuItemProps['onClick']
): (event: MouseEvent) => void {
  return (event: MouseEvent): void => {
    handleMenuItemClick(event, disabled, onClick)
  }
}

export function MenuItem(props: MenuItemProps): ReactElement {
  const {
    children,
    onClick,
    disabled = false,
    danger = false,
    role = defaultRole,
    className = '',
  } = props
  const testId: string | undefined = props['data-testid']
  const classes: string = buildMenuItemClasses({ disabled, danger, className })
  const clickHandler: (e: MouseEvent) => void = createClickHandler(
    disabled,
    onClick
  )

  if ('to' in props && props.to) {
    return (
      <Link
        to={props.to}
        className={classes}
        role={role}
        data-testid={testId}
        onClick={clickHandler}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      role={role}
      disabled={disabled}
      data-testid={testId}
      onClick={clickHandler}
    >
      {children}
    </button>
  )
}

export default MenuItem
