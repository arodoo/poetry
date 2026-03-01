/*
 * File: check-mobile-build.mjs
 * Purpose: Pre-launch gate for the mobile dev server. Runs
 * tsc --noEmit and fails fast if compilation errors exist,
 * excluding known pre-existing e2e type issues. Prevents
 * broken code from reaching Metro bundler at all.
 * All Rights Reserved. Arodi Emmanuel
 */
import { execSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..', '..', '..')
const mobile = resolve(root, 'poetry-mobile')

const IGNORED = ['tests/e2e/']

/** @returns {string[]} filtered error lines */
export function checkMobileBuild() {
  let output = ''
  try {
    execSync('npx tsc --noEmit', {
      cwd: mobile,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    return []
  } catch (err) {
    output = err.stdout || ''
  }
  const lines = output.split('\n').filter((l) => l.trim())
  return lines.filter(
    (l) => !IGNORED.some((ig) => l.includes(ig))
  )
}

const errors = checkMobileBuild()
if (errors.length > 0) {
  console.error('\n\x1b[31m❌ Mobile build check failed:\x1b[0m\n')
  errors.forEach((e) => console.error(`  ${e}`))
  console.error('\n  Fix errors before launching.\n')
  process.exit(1)
} else {
  console.log('\x1b[32m✅ Mobile typecheck passed\x1b[0m\n')
}
