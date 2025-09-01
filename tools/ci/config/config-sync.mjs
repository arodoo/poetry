#!/usr/bin/env node
/*
 * File: config-sync.mjs
 * Purpose: Validates that configuration files across the repo are
 * synchronized and keeps developer tooling consistent with CI expectations.
 * This script aids in maintaining shared standards between local and CI.
 * All Rights Reserved. Arodi Emmanuel
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cfgPath = path.resolve(__dirname, '../../../code-standards.config.json')
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'))

function read(p) { return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '' }
function write(p, c) { fs.writeFileSync(p, c) }

function updateEslint() {
  const p = path.resolve(__dirname, '../../../poetry-frontend/eslint.config.js')
  if (!fs.existsSync(p)) return console.log('ESLint config not found, skip.')
  let s = read(p)
  
  // Remove max-len if present (Prettier handles formatting)
  s = s.replace(/'max-len': \['error', \{ code: \d+,.*?\],\s*/g, '')
  s = s.replace(/\s+'max-len': \['error', \{ code: \d+,.*?\],/g, '')
  
  // Update max-lines rule
  s = s.replace(/\{ max: \d+, skipBlankLines:/g,
    `{ max: ${cfg.fileLineLimit}, skipBlankLines:`)

  write(p, s)
  console.log(`✓ ESLint: max-len removed (Prettier handles), ${
    cfg.fileLineLimit} lines`)
}

function updateCheckstyle() {
  const p = path.resolve(__dirname, '../../../checkstyle.xml')
  if (!fs.existsSync(p)) return console.log('Checkstyle not found, skip.')
  let s = read(p)
  const limit = cfg.characterLimits.backend.java
  s = s.replace(/<property name="max" value="\d+"/g,
    `<property name="max" value="${limit}"`)
  write(p, s)
  console.log(`✓ Checkstyle: ${limit} chars`)
}

function showCfg() {
  console.log('\n📋 Current Code Standards Configuration:')
  console.log(`   File Line Limit: ${cfg.fileLineLimit}`)
  console.log(`   Backend (Java): ${cfg.characterLimits.backend.java} chars`)
  console.log(
    `   Frontend (TS/JS): ${cfg.characterLimits.frontend.typescript} chars`
  )
  console.log(`   Default: ${cfg.characterLimits.default} chars`)
}

console.log('🔄 Synchronizing configuration files...')
showCfg()
console.log('\n📝 Updating configuration files:')
updateEslint()
updateCheckstyle()
console.log('\n✅ Configuration synchronization complete!')
