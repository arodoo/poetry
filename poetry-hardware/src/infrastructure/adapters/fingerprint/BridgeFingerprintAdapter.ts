// File: BridgeFingerprintAdapter.ts
// Purpose: Adapter implementing FingerprintPort via HTTP bridge.
// Delegates all operations to bridge/* modules for R503 sensor access.
// All Rights Reserved. Arodi Emmanuel

import {
  FingerprintPort,
  EnrollResult,
  VerifyResult,
} from '../../../application/ports/FingerprintPort.js';
import { logger } from '../../logging/logger.js';
import * as lifecycle from '../bridge/BridgeLifecycle.js';
import * as ops from '../bridge/BridgeFingerprintOperations.js';

export class BridgeFingerprintAdapter implements FingerprintPort {
  private initialized = false;

  async initialize(): Promise<void> {
    try {
      await lifecycle.connectBridge();
      this.initialized = true;
    } catch (error) {
      logger.error(
        `Failed to connect to fingerprint bridge: ${error}`
      );
      throw error;
    }
  }

  async enroll(templateId: number): Promise<EnrollResult> {
    this.ensureInitialized();
    return ops.enrollFingerprint(templateId);
  }

  async verify(): Promise<VerifyResult> {
    this.ensureInitialized();
    return ops.verifyFingerprint();
  }

  async deleteTemplate(templateId: number): Promise<boolean> {
    this.ensureInitialized();
    return ops.deleteTemplate(templateId);
  }

  async getTemplateCount(): Promise<number> {
    this.ensureInitialized();
    return ops.getTemplateCount();
  }

  async close(): Promise<void> {
    if (!this.initialized) return;
    await lifecycle.disconnectBridge();
    this.initialized = false;
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error('Fingerprint bridge not initialized');
    }
  }
}
