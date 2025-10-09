#!/usr/bin/env node
/*
 * File: add-ts-nocheck-to-generated.mjs
 * Purpose: Add @ts-nocheck comment to generated SDK files
 * to exclude them from strict type checking.
 * All Rights Reserved. Arodi Emmanuel
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

const generatedDir = 'src/api/generated'

function addTsNocheck(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  if (content.startsWith('// @ts-nocheck')) {
    return
  }
  const newContent = `// @ts-nocheck\n${content}`
  writeFileSync(filePath, newContent, 'utf-8')
  console.log(`✓ Added @ts-nocheck to ${filePath}`)
}

function processDirectory(dir) {
  const entries = readdirSync(dir)
  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      processDirectory(fullPath)
    } else if (extname(entry) === '.ts') {
      addTsNocheck(fullPath)
    }
  }
}

processDirectory(generatedDir)
console.log('✅ Finished adding @ts-nocheck to generated files')
