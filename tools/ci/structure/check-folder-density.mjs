#!/usr/bin/env node
/**
 * File: check-folder-density.mjs
 * Purpose: Validates folder file count limits following cognitive load
 * principles. Industry standard: 7-10 files max per folder for easy
 * navigation. Uses 10 as default with scalable exceptions for special cases.
 * All Rights Reserved. Arodi Emmanuel
 */

import { readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

const ROOT = process.cwd();
const DEFAULT_MAX_FILES = 10;

/**
 * Scalable exceptions: folders that naturally accumulate more files.
 * Format: { pattern: maxFiles }
 * Tiers: 15 (moderate), 20 (high), 25 (very high)
 */
const SCALABLE_EXCEPTIONS = {
  // Only truly unavoidable cases (e.g., barrel exports)
  // Everything else MUST be split into subfolders
};

const CONFIG = {
  frontend: {
    basePath: 'poetry-frontend/src',
    maxFiles: DEFAULT_MAX_FILES,
    excludeDirs: ['node_modules', 'dist', '.git', 'generated'],
  },
  hardware: {
    basePath: 'poetry-hardware/src',
    maxFiles: DEFAULT_MAX_FILES,
    excludeDirs: ['node_modules', 'dist', '.git'],
  },
  backend: {
    basePath: 'poetry-backend/src/main/java',
    maxFiles: DEFAULT_MAX_FILES,
    excludeDirs: ['target', '.git'],
  },
};

function countFilesInDir(dirPath) {
  if (!existsSync(dirPath)) return 0;
  const entries = readdirSync(dirPath, { withFileTypes: true });
  return entries.filter((e) => e.isFile()).length;
}

function getMaxForDir(dirPath, baseMax) {
  for (const [pattern, max] of Object.entries(SCALABLE_EXCEPTIONS)) {
    if (dirPath.includes(pattern)) return max;
  }
  return baseMax;
}

function walkDirs(basePath, config, violations) {
  if (!existsSync(basePath)) return;

  function recurse(dir) {
    const entries = readdirSync(dir, { withFileTypes: true });
    const subDirs = entries.filter((e) => e.isDirectory());

    for (const sub of subDirs) {
      const fullPath = join(dir, sub.name);
      const relPath = relative(ROOT, fullPath);

      if (config.excludeDirs.some((ex) => relPath.includes(ex))) continue;

      const fileCount = countFilesInDir(fullPath);
      const maxAllowed = getMaxForDir(relPath, config.maxFiles);

      if (fileCount > maxAllowed) {
        violations.push({
          type: 'folder-density',
          path: relPath,
          count: fileCount,
          max: maxAllowed,
          message: `${relPath} has ${fileCount} files (max: ${maxAllowed})`,
        });
      }
      recurse(fullPath);
    }
  }

  recurse(basePath);
}

export function checkFolderDensity() {
  const violations = [];

  for (const [, cfg] of Object.entries(CONFIG)) {
    const fullBase = join(ROOT, cfg.basePath);
    walkDirs(fullBase, cfg, violations);
  }

  return violations;
}

if (process.argv[1].includes('check-folder-density')) {
  const v = checkFolderDensity();
  if (v.length === 0) {
    console.log('✅ All folders within density limits\n');
    process.exit(0);
  }
  console.log(`❌ ${v.length} folders exceed file limits:\n`);
  v.sort((a, b) => b.count - a.count);
  for (const item of v) console.log(`   ${item.message}`);
  console.log('\n💡 Split large folders into sub-features');
  process.exit(1);
}
