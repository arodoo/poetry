// File: BridgeLifecycle.ts
// Purpose: Bridge connection lifecycle management (open/close device).
// Handles health checks and device initialization with error handling.
// All Rights Reserved. Arodi Emmanuel

import { logger } from '../../logging/logger.js';
import * as bridge from './BridgeHttpClient.js';

export async function connectBridge(): Promise<void> {
  await bridge.checkBridgeHealth();
  const data = await bridge.openDevice();
  if (!data.success) {
    throw new Error(`Failed to open device: ${data.code}`);
  }
  logger.info('Fingerprint bridge connected successfully');
}

export async function disconnectBridge(): Promise<void> {
  try {
    await bridge.closeDevice();
    logger.info('Fingerprint bridge connection closed');
  } catch (error) {
    logger.error(`Error closing bridge connection: ${error}`);
  }
}
