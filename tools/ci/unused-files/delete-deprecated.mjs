/*
 File: delete-deprecated.mjs
 Purpose: Deletes deprecated files after confirmation.
 All Rights Reserved. Arodi Emmanuel
*/
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SCAN_DIRS } from './lib/patterns.mjs'
import { walk, isDeprecated, promptConfirmation } from './lib/deleter.mjs'
import { deleteFile } from './lib/deleter.mjs'
import { groupByDir, displayGrouped } from './lib/displayer.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../../..')

function findDeprecated() {
  const files = []
  const seen = new Set()
  const dirs = SCAN_DIRS.map((d) => path.join(ROOT, d))

  for (const dir of dirs) {
    for (const fp of walk(dir)) {
      const norm = path.normalize(fp)
      if (seen.has(norm) || !isDeprecated(fp)) continue
      files.push(norm)
      seen.add(norm)
    }
  }
  return files
}

async function run() {
  console.log('🔍 Finding deprecated files...\n')
  const files = findDeprecated()

  if (files.length === 0) {
    console.log('✅ None found.\n')
    return
  }

  console.log(`📊 Found ${files.length} deprecated:\n`)
  displayGrouped(groupByDir(files, ROOT))

  console.log('\n')
  const ok = await promptConfirmation(`⚠️  Delete ${files.length}? (y/N): `)

  if (!ok) {
    console.log('\n❌ Cancelled.\n')
    return
  }

  console.log('\n🗑️  Deleting...\n')
  let count = 0
  for (const file of files) {
    const name = path.basename(file)
    if (deleteFile(file)) {
      console.log(`   ✅ Deleted: ${name}`)
      count++
    } else {
      console.error(`   ❌ Failed: ${name}`)
    }
  }

  console.log(`\n✅ Deleted ${count}\n`)
  console.log('Run: git add -A && git commit -m "chore: cleanup"\n')
}

run().catch((error) => {
  console.error('❌ Error:', error)
  process.exit(1)
})

