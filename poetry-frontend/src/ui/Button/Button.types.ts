/* File: Button.types.ts
 Purpose: Type definitions for the Button component. Exports ButtonProps and
 related types so the implementation can be split across multiple files.
 This keeps the public surface stable while enabling smaller implementation
 files that comply with CI line/char rules. All Rights Reserved. Arodi Emmanuel
*/
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

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

// ButtonProps exported above via its declaration
