#!/usr/bin/env node
/*
 * File: check-sdk-extraction.mjs
 * Purpose: CI checker to enforce usage of extractSdkData helper
 * instead of inline response.data extraction pattern. Ensures DRY
 * principle and prevents drift in SDK wrapper implementations.
 * All Rights Reserved. Arodi Emmanuel
 */

import { readFile, readdir } from 'fs/promises'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const PROJECT_ROOT = join(__dirname, '..', '..', '..')

const INLINE_PATTERN =
  /\(\s*\w+\s+as\s+\{\s*data\?\s*:\s*unknown\s*\}\s*\)\.data/g

const violations = []

function shouldExclude(fullPath, relativePath) {
  if (relativePath.includes('node_modules')) return true
  if (relativePath.includes('/generated/')) return true
  if (relativePath.includes('\\generated\\')) return true
  if (relativePath.includes('/test')) return true
  if (relativePath.includes('.test.')) return true
  if (relativePath.includes('.spec.')) return true
  if (relativePath.endsWith('extractSdkData.ts')) return true
  return false
}

function shouldInclude(filename) {
  return filename.endsWith('.ts') && !filename.endsWith('.d.ts')
}

async function scanDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    const relativePath = relative(PROJECT_ROOT, fullPath)

    if (shouldExclude(fullPath, relativePath)) continue

    if (entry.isDirectory()) {
      await scanDirectory(fullPath)
    } else if (entry.isFile() && shouldInclude(entry.name)) {
      if (
        relativePath.includes('features') &&
        relativePath.includes('api')
      ) {
        await scanFile(fullPath, relativePath)
      }
    }
  }
}

async function scanFile(filePath, relativePath) {
  const content = await readFile(filePath, 'utf-8')
  const matches = content.match(INLINE_PATTERN)

  if (matches && matches.length > 0) {
    violations.push({
      file: relativePath,
      count: matches.length,
    })
  }
}

async function checkSdkExtraction() {
  const frontendRoot = join(PROJECT_ROOT, 'poetry-frontend', 'src')
  await scanDirectory(frontendRoot)

  if (violations.length > 0) {
    console.error('❌ SDK Extraction Pattern Violations Found:\n')
    violations.forEach(({ file, count }) => {
      console.error(`  ${file}: ${count} violation(s)`)
    })
    console.error(
      '\n💡 Use extractSdkData() from src/shared/api/extractSdkData.ts'
    )
    console.error('   Instead of: (response as { data?: unknown }).data')
    console.error('   Use: extractSdkData(response) as YourType\n')
    process.exit(1)
  }

  console.log('✅ SDK extraction pattern check passed')
}

checkSdkExtraction().catch((err) => {
  console.error('Error during SDK extraction check:', err)
  process.exit(1)
})
