#!/usr/bin/env node
/**
 * File: check-ddd-organization.mjs
 * Purpose: Main entry for DDD file organization validation. Aggregates
 * results from frontend-pages, hardware-adapters and folder-density.
 * All Rights Reserved. Arodi Emmanuel
 */

import { checkFrontendPages } from './frontend-pages-checker.mjs';
import { checkHardwareAdapters } from './hardware-adapters-checker.mjs';
import { checkFolderDensity } from './check-folder-density.mjs';

function main() {
  console.log('🔍 Checking DDD file organization...\n');

  const violations = [
    ...checkFrontendPages(),
    ...checkHardwareAdapters(),
    ...checkFolderDensity(),
  ];

  if (violations.length === 0) {
    console.log('✅ All files properly organized\n');
    process.exit(0);
  }

  console.log(`❌ Found ${violations.length} organization violations:\n`);

  const byType = {};
  for (const v of violations) {
    byType[v.type] = byType[v.type] || [];
    byType[v.type].push(v);
  }

  for (const [type, items] of Object.entries(byType)) {
    console.log(`\n📁 ${type}:`);
    for (const item of items) {
      console.log(`   - ${item.message}`);
    }
  }

  console.log('\n💡 See docs/architecture/ddd-file-organization.md');
  process.exit(1);
}

main();
