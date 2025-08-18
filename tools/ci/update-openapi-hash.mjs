#!/usr/bin/env node
/*
 File: update-openapi-hash.mjs
 Purpose: Write the new OpenAPI spec hash after the SDK is
 updated. This acknowledges contract changes and keeps
 parity checks green. It guides devs to regenerate code.
 All Rights Reserved. Arodi Emmanuel
*/
import fs from 'node:fs'
import crypto from 'node:crypto'
import path from 'node:path'

const specPath = path.resolve('docs/api/openapi-v1.yaml')
const hashFile = path.resolve('poetry-frontend/src/sdk/.openapi.hash')

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex')
}

const spec = fs.readFileSync(specPath)
const specHash = sha256(spec)

fs.mkdirSync(path.dirname(hashFile), { recursive: true })
fs.writeFileSync(hashFile, `${specHash}\n`, 'utf8')
console.log('Updated SDK OpenAPI hash:', specHash)
