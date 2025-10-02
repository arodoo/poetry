#!/usr/bin/env node
/*
 * File: check-hardcoded-colors.mjs
 * Purpose: Main entry point for hardcoded color detection tool. Scans the
 * frontend codebase for hardcoded color values and Tailwind classes. Reports
 * violations to enforce theme-based design system consistency.
 * All Rights Reserved. Arodi Emmanuel
 */

import { fileURLToPath } from 'url'
import { join } from 'path'
import { ColorScanner } from './scanner.mjs'
import { printReport } from './reporter.mjs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const PROJECT_ROOT = join(__dirname, '..', '..', '..')
const FRONTEND_ROOT = join(PROJECT_ROOT, 'poetry-frontend')

async function main() {
  const scanner = new ColorScanner(PROJECT_ROOT)

  console.log('🔍 Scanning for hardcoded colors...\n')
  console.log(`📂 Frontend: ${FRONTEND_ROOT}`)

  try {
    await scanner.scanDirectory(FRONTEND_ROOT)
    const success = printReport(scanner)
    process.exit(success ? 0 : 1)
  } catch (error) {
    console.error('❌ Error during scanning:', error)
    process.exit(1)
  }
}

main()
