/*
 * File: EyeOpen.tsx
 * Purpose: Small presentational SVG fragment used by the password input
 * visibility toggle. Keeping this fragment isolated reduces the size of
 * the input component and simplifies snapshot testing for the icon only.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'

export const EyeOpen: ReactElement = (
  <>
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M2.25 12s3.75-7.5 9.75-7.5"
    />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M12 4.5s9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5"
    />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M12 15.75a3.75 3.75 0 1 0 0-7.5"
    />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M12 15.75a3.75 3.75 0 0 0 0 0Z"
    />
  </>
)

export default EyeOpen
