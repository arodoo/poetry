// File: index.js
// Purpose: Main entry point for fingerprint bridge service
// Initializes SDK and starts HTTP server
// All Rights Reserved. Arodi Emmanuel

import path from 'path';
import { fileURLToPath } from 'url';
import { initialize } from './application/index.js';
import { createServer, startServer } from
  './infrastructure/http/server-factory.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const dllPath = path.join(__dirname, '..', 'dll', 'SynoAPIEx.dll');

  console.log('Initializing fingerprint SDK...');
  console.log(`Architecture: ${process.arch}`);
  console.log(`DLL: ${dllPath}`);

  if (process.arch !== 'ia32') {
    console.error('ERROR: Must run with 32-bit Node.js');
    process.exit(1);
  }

  try {
    initialize(dllPath);
    console.log('SDK initialized successfully');

    const app = createServer();
    startServer(app, 3001);

    // Auto-open device on startup (important for nodemon restarts)
    const { openDevice } = await import('./application/index.js');
    const result = openDevice();
    if (result.code === 0) {
      console.log('Device auto-opened successfully');
    } else {
      console.warn(`Device auto-open failed with code ${result.code}`);
    }
  } catch (error) {
    console.error('Failed to initialize:', error.message);
    process.exit(1);
  }
}

main();
