#!/usr/bin/env node
/*
 * File: sdk-manual-report.mjs
 * Purpose: Main entry point for manual SDK analysis. Scans
 * features, analyzes patterns, detects drift, prints report.
 * All Rights Reserved. Arodi Emmanuel
 */
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { scanFeatures } from './scanFeatures.mjs'
import { analyzePatterns } from './analyzePatterns.mjs'
import { detectDrift } from './detectDrift.mjs'
import { printReport } from './printReport.mjs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootDir = join(__dirname, '..', '..', '..')
const sdkPath = join(
  rootDir,
  'poetry-frontend',
  'src',
  'shared',
  'sdk'
)
const openApiPath = join(rootDir, 'docs', 'api', 'openapi-v1.yaml')

const features = scanFeatures(sdkPath)
const patterns = analyzePatterns(features)
const drift = detectDrift(features, openApiPath)

printReport(features, patterns, drift)
