/**
 * File: hardware-adapters-checker.mjs
 * Purpose: Validates hardware adapters/ has files grouped in subdirectories.
 * Part of DDD organization checker split for line limit compliance.
 * All Rights Reserved. Arodi Emmanuel
 */

import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const HARDWARE_ADAPTERS = 'poetry-hardware/src/infrastructure/adapters';

export function checkHardwareAdapters() {
  const violations = [];
  const adaptersPath = join(process.cwd(), HARDWARE_ADAPTERS);

  let entries;
  try {
    entries = readdirSync(adaptersPath);
  } catch {
    return violations;
  }

  for (const entry of entries) {
    const fullPath = join(adaptersPath, entry);
    if (statSync(fullPath).isFile()) {
      violations.push({
        type: 'hardware-adapters',
        file: entry,
        message: `Loose file in adapters/: ${entry}`,
      });
    }
  }

  return violations;
}
