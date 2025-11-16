#!/usr/bin/env node
/*
 * File: check-lines.mjs
 * Purpose: Check files for maximum line length violations and report
 * offending lines so developers can split or refactor them. It
 * integrates with repository config to ensure consistent limits across
 * tools and environments. It also prints guidance to help developers
 * resolve issues quickly.
 * All Rights Reserved. Arodi Emmanuel
 */

import path from 'node:path'
import { execSync } from 'node:child_process'
import { getChangedFiles, shouldUseFallback } from '../utils/git-utils.mjs'
import {
  ROOTS,
  EXTENSIONS,
  walkDirectory,
  isInAllowedRoots,
} from '../utils/file-utils.mjs'
import { validateFiles } from '../utils/validator.mjs'

// Validate configuration files are synchronized
console.log('🔍 Validating configuration sync...')
try {
  execSync('node tools/ci/config/validate-config-sync.mjs', {
    stdio: 'inherit',
    cwd: process.cwd(),
  })
} catch (error) {
  console.error('❌ Configuration files are not synchronized')
  console.error('💡 Run `node tools/ci/config/config-sync.mjs` to fix.')
  process.exit(1)
}
console.log('')

// Get changed files from git, filter by extension and roots
let filesToCheck = getChangedFiles()
  .filter((f) => EXTENSIONS.has(path.extname(f)))
  .filter(isInAllowedRoots)

// If no files found and fallback enabled, scan all roots
if (!filesToCheck.length && shouldUseFallback()) {
  const allFiles = []
  for (const root of ROOTS) {
    for (const file of walkDirectory(root)) {
      if (EXTENSIONS.has(path.extname(file))) allFiles.push(file)
    }
  }
  filesToCheck = allFiles
}

// Exit early if no files to check
if (!filesToCheck.length) process.exit(0)

// Validate files and report
const result = validateFiles(filesToCheck)
if (!result.valid) {
  console.error('❌ Line limit violations found:')
  result.errors.forEach((e) => console.error(`  ${e}`))
  console.error('\n💡 Lines should be read and organized')
  console.error('   into smaller modular files')
  console.error('   Don\'t compress.')

  process.exit(1)
}

console.log('✅ All files pass line limit checks')
