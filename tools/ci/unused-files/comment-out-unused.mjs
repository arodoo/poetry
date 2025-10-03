#!/usr/bin/env node
/*
 File: comment-out-unused.mjs
 Purpose: Comments out all code in unused files instead of deleting them.
 This preserves file history and makes it easy to restore if needed later.
 The script wraps entire file content in block comments with deprecation notice.
 All Rights Reserved. Arodi Emmanuel
*/
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { findUnusedFiles } from './lib/scanner.mjs'
import { commentOutFile } from './lib/commenter.mjs'
import { rel } from './lib/patterns.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../../..')

async function main() {
  console.log('🔍 Finding unused files to comment out...\n')

  const unused = findUnusedFiles(ROOT)

  if (unused.length === 0) {
    console.log('✅ No unused files found!')
    process.exit(0)
  }

  console.log(
    '📊 Found ' + String(unused.length) +
      ' unused file(s) to comment out:'
  )
  console.log('\n')

  const byDir = {}
  for (const u of unused) {
    const d = path.dirname(rel(ROOT, u))
    byDir[d] = byDir[d] || []
    byDir[d].push(u)
  }

  let totalCommented = 0
  for (const d of Object.keys(byDir).sort()) {
    console.log('📁 ' + String(d) + '/')
    for (const f of byDir[d]) {
      const wasCommented = commentOutFile(f)
      if (wasCommented) totalCommented++
    }
    console.log('')
  }

  console.log('\n✅ Commented out ' + String(totalCommented) + ' file(s)')
  console.log('Files remain in repository but all code is now commented.')
  console.log(
    'Review changes with: git diff, then commit with a descriptive message.'
  )
  process.exit(0)
}

main()
