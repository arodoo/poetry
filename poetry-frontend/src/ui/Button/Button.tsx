/*
 File: Button.tsx
 Purpose: Token-driven button component that composes Tailwind utility
 classes and CSS variables for colors and spacing. It provides small and
 medium sizes and primary/secondary variants while ensuring a single
 deterministic text color class to avoid conflicting utilities.
 All Rights Reserved. Arodi Emmanuel
*/
/* eslint-disable max-lines, @typescript-eslint/no-unnecessary-condition */
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactElement,
} from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

export type TextTone = 'default' | 'primary' | 'error' | 'muted'

export type ButtonProps =
  | (ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: 'primary' | 'secondary'
      size?: 'sm' | 'md'
      textTone?: TextTone
      href?: undefined
      to?: undefined
    })
  | (AnchorHTMLAttributes<HTMLAnchorElement> & {
      variant?: 'primary' | 'secondary'
      size?: 'sm' | 'md'
      textTone?: TextTone
      href: string
      to?: undefined
    })
  | ({
      variant?: 'primary' | 'secondary'
      size?: 'sm' | 'md'
      textTone?: TextTone
      to: string
      href?: undefined
    } & Record<string, unknown>)

export function Button(props: ButtonProps): ReactElement {
  const {
    className,
    variant = 'primary',
    size = 'md',
    textTone = 'default',
    ...rest
  } = props
  const base: string =
    'inline-flex items-center font-medium rounded appearance-none select-none ' +
    'focus:outline-none focus:ring ' +
    'focus:ring-[var(--focus-ring-color)] focus:ring-offset-1 ' +
    'focus:ring-[length:var(--focus-ring-width)]'

  let textColorClass: string = ''
  if (variant === 'primary') {
    textColorClass = 'text-[var(--color-onPrimary)]'
  } else if (variant === 'secondary') {
    if (textTone === 'primary') {
      textColorClass = 'text-[var(--color-primary)]'
    } else if (textTone === 'error') {
      textColorClass = 'text-[var(--color-error)]'
    } else if (textTone === 'muted') {
      textColorClass = 'text-[var(--color-textMuted)]'
    } else {
      textColorClass = 'text-[var(--color-text)]'
    }
  }

  const primaryBg: string = 'bg-[var(--color-primary)] hover:opacity-90'
  const secondaryBg: string =
    'bg-[var(--color-surface)] hover:bg-[var(--color-muted)]'
  const sizeClasses: Record<string, string> = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
  }

  const classNames: string = clsx(
    base,
    variant === 'primary' ? primaryBg : secondaryBg,
    textColorClass,
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
