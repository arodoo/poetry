/*
 * File: reporter-helpers.mjs
 * Purpose: Helper functions for report formatting. Prints correction examples
 * showing how to replace hardcoded colors with CSS variables. Lists all
 * available theme variables for developer reference.
 * All Rights Reserved. Arodi Emmanuel
 */

import { EXPECTED_THEME_VARS } from './patterns.mjs'

export function printExamples() {
  console.log('1. Replace hex/rgb/hsl with CSS variables:')
  console.log('   ❌ text-[#1a1a1a]  →  ✅ text-[var(--color-text)]')
  console.log('   ❌ bg-[#ffffff]    →  ✅ bg-[var(--color-surface)]')
  console.log('')
  console.log('2. Replace Tailwind colors with CSS variables:')
  console.log('   ❌ text-neutral-900  →  ✅ text-[var(--color-text)]')
  console.log('   ❌ bg-gray-50        →  ✅ bg-[var(--color-background)]')
  console.log('   ❌ border-slate-200  →  ✅ border-[var(--color-border)]')
  console.log('')
}

export function printAvailableVars() {
  console.log('3. Available theme CSS variables:')
  EXPECTED_THEME_VARS.forEach((varName) => {
    console.log(`   • ${varName}`)
  })
}
