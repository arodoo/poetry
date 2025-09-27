/*
 * File: EyeClosed.tsx
 * Purpose: SVG fragment for the password input 'closed eye' icon. Extracting
 * this fragment keeps the input component concise and makes the icon easy
 * to test and maintain independently from component logic.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'

export const EyeClosed: ReactElement = (
  <>
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M3 3l18 18"
    />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M9.88 9.88A3.5 3.5 0 0 1 12 8.5"
    />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M12 8.5c2 0 3.5 1.5 3.5 3.5"
    />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M15.5 12c0 .79-.26 1.52-.7 2.11"
    />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M7.5 7.5C5.1 8.92 3.5 12 3.5 12s3.2 6 8.5 6"
    />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M16 18.5c1.3 0 2.47-.25 3.5-.68"
    />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M16.5 7.82C18.9 9.07 20.5 12 20.5 12"
    />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M20.5 12s-.74 1.38-2.08 2.79"
    />
  </>
)

export default EyeClosed
