#!/usr/bin/env node
/*
 File: check-openapi-hash.mjs
 Purpose: Detect SDK drift from the OpenAPI spec by
 comparing a stable hash. This prevents code using an
 outdated client when the spec changes. It helps keep
 contracts stable and visible during reviews.
 All Rights Reserved. Arodi Emmanuel
*/
import fs from 'node:fs'
import crypto from 'node:crypto'
import path from 'node:path'

const specPath = path.resolve('docs/api/backend-generated/v1/openapi.yaml')
const hashFile = path.resolve('poetry-frontend/src/sdk/.openapi.hash')

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex')
}

if (!fs.existsSync(specPath)) {
  console.error('OpenAPI spec not found:', specPath)
  process.exit(1)
}
const spec = fs.readFileSync(specPath)
const specHash = sha256(spec)

if (!fs.existsSync(hashFile)) {
  console.error('SDK hash file missing:', hashFile)
  process.exit(1)
}
const sdkHash = fs.readFileSync(hashFile, 'utf8').trim()

if (sdkHash !== specHash) {
  console.error('SDK drift detected. Run: npm run sdk:sync')
  process.exit(1)
}
