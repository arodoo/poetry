#!/usr/bin/env node
// Fetch a small set of .woff2 font files into poetry-frontend/public/fonts
// Purpose: make CI deterministic by serving local font files instead of relying on external CDN
// Usage: node tools/scripts/fetch-fonts.mjs

import fs from 'fs';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import https from 'https';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../../poetry-frontend/public/fonts');
// We'll fetch Google Fonts CSS for Inter and extract the woff2 URLs for the two weights
const googleCssUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
const desired = [
  { weight: '400', name: 'Inter-Regular.woff2' },
  { weight: '700', name: 'Inter-Bold.woff2' }
];

function ensureDir(path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirect
        resolve(download(res.headers.location, dest));
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    });
    req.on('error', err => {
      fs.unlinkSync(dest, { force: true });
      reject(err);
    });
  });
}

async function main() {
  ensureDir(outDir);
  // If FONT_ARTIFACT_BASE is provided, prefer downloading directly from that stable base URL.
  // Example: https://github.com/<owner>/<repo>/releases/download/fonts-v1
  const artifactBase = process.env.FONT_ARTIFACT_BASE && String(process.env.FONT_ARTIFACT_BASE).replace(/\/+$/,'');
  if (artifactBase) {
    console.log(`Downloading fonts directly from artifact base: ${artifactBase}`);
    for (const d of desired) {
      const url = `${artifactBase}/${d.name}`;
      const dest = join(outDir, d.name);
      try {
        if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
          console.log(`${d.name} already exists, skipping`);
          continue;
        }
        console.log(`Downloading ${url} -> ${dest}`);
        await download(url, dest);
        console.log(`Saved ${dest}`);
      } catch (err) {
        console.error(`Failed to download ${url}:`, err.message);
      }
    }
    return;
  }

  console.log('Fetching Google Fonts CSS to discover woff2 urls...');
  async function fetchCssWithHeaders(headers) {
    return await new Promise((resolve, reject) => {
      let buf = '';
      const req = https.get(googleCssUrl, { headers }, res => {
        if (res.statusCode !== 200) return reject(new Error('Failed to fetch Google Fonts CSS: ' + res.statusCode));
        res.setEncoding('utf8');
        res.on('data', d => buf += d);
        res.on('end', () => resolve(buf));
      });
      req.on('error', reject);
    });
  }

  // Try a couple of header combinations because Google serves different formats depending on UA/Accept
  let css = '';
  try {
    css = await fetchCssWithHeaders({ 'User-Agent': 'Mozilla/5.0', 'Accept': 'text/css' });
  } catch (err) {
    // fallthrough, we'll retry with stronger headers
  }
  if (!/\.woff2/.test(css)) {
    try {
      css = await fetchCssWithHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.90 Safari/537.36',
        'Accept': '*/*'
      });
    } catch (err) {
      // last resort, rethrow
      throw err;
    }
  }

  // Split CSS into @font-face blocks
  const blocks = css.match(/@font-face\s*\{[\s\S]*?\}/g) || [];
  for (const d of desired) {
    const weight = d.weight;
    // collect candidates for this weight
    const candidates = [];
    for (const b of blocks) {
      const w = b.match(/font-weight:\s*(\d+)/i);
      if (!w) continue;
      if (String(w[1]) !== String(weight)) continue;
      const urlMatch = b.match(/url\((https:[^)]+\.woff2)\)/i);
      if (!urlMatch) continue;
      const unicode = b.match(/unicode-range:\s*([^;]+);/i);
      candidates.push({ block: b, url: urlMatch[1], unicode: unicode ? unicode[1] : '' });
    }
    // prefer unicode-range that includes basic latin U+0000-00FF or the comment 'latin'
    let chosen = candidates.find(c => /U\+0000-00FF/.test(c.unicode) || /latin/i.test(c.block));
    if (!chosen) chosen = candidates[0];
    if (!chosen) {
      console.warn(`No woff2 candidate found for weight ${weight}, skipping`);
      continue;
    }
    const url = chosen.url;
    const dest = join(outDir, d.name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      console.log(`${d.name} already exists, skipping`);
      continue;
    }
    console.log(`Downloading ${url} -> ${dest}`);
    try {
      // ensure we pass a UA header when downloading as well
      await new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            resolve(download(res.headers.location, dest));
            return;
          }
          if (res.statusCode !== 200) {
            reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
            return;
          }
          res.pipe(file);
          file.on('finish', () => file.close(resolve));
        });
        req.on('error', err => {
          fs.unlinkSync(dest, { force: true });
          reject(err);
        });
      });
      console.log(`Saved ${dest}`);
    } catch (err) {
      console.error(`Failed to download ${url}:`, err.message);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
