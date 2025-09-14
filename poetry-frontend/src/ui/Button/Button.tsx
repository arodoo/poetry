/*
 File: Button.tsx
 Purpose: Token-driven button component with minimal variants using CSS vars
 and Tailwind utility classes. Internationalization is delegated to caller.
 All Rights Reserved. Arodi Emmanuel
*/
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactElement,
} from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

export type ButtonProps =
  | (ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: 'primary' | 'secondary'
      size?: 'sm' | 'md'
      href?: undefined
      to?: undefined
    })
  | (AnchorHTMLAttributes<HTMLAnchorElement> & {
      variant?: 'primary' | 'secondary'
      size?: 'sm' | 'md'
      href: string
      to?: undefined
    })
  | ({
      variant?: 'primary' | 'secondary'
      size?: 'sm' | 'md'
      to: string
      href?: undefined
    } & Record<string, unknown>)

export function Button(props: ButtonProps): ReactElement {
  const { className, variant = 'primary', size = 'md', ...rest } = props
  const base: string =
    'inline-flex items-center font-medium rounded ' +
    'focus:outline-none focus:ring' +
    ' focus:ring-[var(--focus-ring-color)] focus:ring-offset-1 ' +
    'focus:ring-[length:var(--focus-ring-width)]'
  const variantClasses: Record<string, string> = {
    primary:
      'bg-[var(--color-primary)] text-[var(--color-text,#1a1a1a)] ' +
      'hover:opacity-90',
    secondary:
      'bg-[var(--color-background,#f5f5f5)] ' +
      'text-[var(--color-text,#1a1a1a)] ' +
      'border border-[var(--color-border,#d0d0d0)] ' +
      'hover:bg-[var(--color-surface,#ffffff)]',
  }
  const sizeClasses: Record<string, string> = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
  }
  const classNames: string = clsx(
    base,
    variantClasses[variant],
    sizeClasses[size],
    className as string | undefined
  )
  if ('to' in rest && typeof (rest as { to?: unknown }).to === 'string') {
    const to: string = (rest as { to: string }).to
    const linkProps: Record<string, unknown> = { ...rest }
    delete (linkProps as { to?: string }).to
    return <Link className={classNames} to={to} {...linkProps} />
  }
  if ('href' in rest && typeof (rest as { href?: unknown }).href === 'string') {
    const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> =
      rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return <a className={classNames} {...anchorProps} />
  }
  const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> =
    rest as ButtonHTMLAttributes<HTMLButtonElement>
  return <button className={classNames} {...buttonProps} />
}
