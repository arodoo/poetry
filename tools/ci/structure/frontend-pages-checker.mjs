/**
 * File: frontend-pages-checker.mjs
 * Purpose: Validates frontend pages/ folders only contain *Page.tsx files.
 * Part of DDD organization checker split for line limit compliance.
 * All Rights Reserved. Arodi Emmanuel
 */

import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const FRONTEND_FEATURES = 'poetry-frontend/src/features';

export function checkFrontendPages() {
  const violations = [];
  const featuresPath = join(process.cwd(), FRONTEND_FEATURES);

  let features;
  try {
    features = readdirSync(featuresPath);
  } catch {
    return violations;
  }

  for (const feature of features) {
    const pagesPath = join(featuresPath, feature, 'pages');
    try {
      const files = readdirSync(pagesPath);
      for (const file of files) {
        const fullPath = join(pagesPath, file);
        const isFile = statSync(fullPath).isFile();
        const isPage = file.endsWith('Page.tsx');
        if (isFile && !isPage) {
          violations.push({
            type: 'frontend-pages',
            feature,
            file,
            message: `Non-page file in pages/: ${file}`,
          });
        }
      }
    } catch {
      continue;
    }
  }

  return violations;
}
