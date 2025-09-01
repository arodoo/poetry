#!/usr/bin/env node
/*
 File: check-headers.mjs
 Purpose: Verify code files start with a C-style header containing the
 file name, a purpose with at least three sentences, and the rights
 legend. Fails CI and lists offending files to aid remediation when
 headers are missing or malformed. This tool scans source files and
 validates header format compliance across the entire repository.
 All Rights Reserved. Arodi Emmanuel
 */
import path from 'node:path'
import { getChangedFiles, shouldUseFallback } from '../utils/git-utils.mjs'
import { ROOTS, walkDirectory, isInAllowedRoots } from '../utils/file-utils.mjs'
import { validateFileHeader } from './header-utils.mjs'

const CODE_EXTS = new Set([
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.mjs',
  '.cjs',
  '.java',
])

function gatherFiles() {
  let files = getChangedFiles().filter((p) => CODE_EXTS.has(path.extname(p)))
  files = files.filter(isInAllowedRoots)
  
  // If no changed files or in CI PR mode, scan all files
  if (!files.length || shouldUseFallback()) {
    files = []
    for (const root of ROOTS) {
      for (const f of walkDirectory(root)) {
        if (CODE_EXTS.has(path.extname(f))) files.push(f)
      }
    }
  }
  return files
}

const files = gatherFiles()
if (!files.length) {
  console.log('✅ No files to check')
  process.exit(0)
}

const allErrors = []
const violatingFiles = new Set()
for (const f of files) {
  const errors = validateFileHeader(f)
  if (errors.length > 0) {
    violatingFiles.add(f)
    allErrors.push(...errors)
  }
}

if (allErrors.length) {
  console.error('❌ Header validation failed:')
  for (const e of allErrors) {
    // print each error on its own line to keep line length short
    console.error(` - ${e}`)
  }
  // print total counts on separate short lines to respect max-line limits
  console.error('\nTotal: ' + violatingFiles.size + ' files violate the rule')
  console.error('Total errors: ' + allErrors.length)
   process.exit(1)
 }
 console.log(`✅ Headers valid (${files.length} files checked)`)
