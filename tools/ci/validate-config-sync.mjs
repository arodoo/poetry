#!/usr/bin/env node
/*
 File: tools/ci/validate-config-sync.mjs
 Purpose: Validate ESLint and Checkstyle against the central config.
 Ensures a single source of truth for limits across the repository.
 Fails fast in CI when drift is detected to stop configuration issues.
 All Rights Reserved. Arodi Emmanuel
*/
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cfgPath = path.resolve(__dirname, '../../code-standards.config.json')
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'))
let hasErrors = false

function validateEslint() {
  const p = path.resolve(__dirname, '../../poetry-frontend/eslint.config.js')
  if (!fs.existsSync(p)) return console.log('⚠️  ESLint config not found')
  const s = fs.readFileSync(p, 'utf8')
  const limit = cfg.characterLimits.frontend.typescript
  const mLen = /'max-len': \['error', \{ code: (\d+),/.exec(s)
  const mLines = /\{ max: (\d+), skipBlankLines:/.exec(s)
  if (!mLen || parseInt(mLen[1]) !== limit) {
    console.log(`❌ ESLint max-len: expected ${limit}, found ${mLen?.[1]}`)
    hasErrors = true
  }
  const exp = cfg.fileLineLimit
  if (!mLines || parseInt(mLines[1]) !== exp) {
    console.log(`❌ ESLint max-lines: expected ${exp}, found ${mLines?.[1]}`)
    hasErrors = true
  }
  if (!hasErrors) console.log('✓ ESLint config is synchronized')
}

function validateCheckstyle() {
  const p = path.resolve(__dirname, '../../checkstyle.xml')
  if (!fs.existsSync(p)) return console.log('⚠️  Checkstyle config not found')
  const s = fs.readFileSync(p, 'utf8')
  const limit = cfg.characterLimits.backend.java
  const m = /<property name="max" value="(\d+)"/.exec(s)
  if (!m || parseInt(m[1]) !== limit) {
    console.log(`❌ Checkstyle max: expected ${limit}, found ${m?.[1]}`)
    hasErrors = true
  }
  if (!hasErrors) console.log('✓ Checkstyle config is synchronized')
}

console.log('🔍 Validating configuration synchronization...')
validateEslint()
validateCheckstyle()
if (hasErrors) {
  console.log('\n❌ Config files are NOT synchronized!')
  console.log('💡 Run "node tools/ci/config-sync.mjs" to fix.')
  process.exit(1)
}
console.log('\n✅ All configuration files are synchronized!')
